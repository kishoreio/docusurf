"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import generateId from "@/lib/generateId";
import routes from "@/constants/routes";
import { loadDocsIntoPinecone } from "@/lib/pinecone";

export async function signInAuth() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });
  if (data.url) {
    redirect(data.url);
  }
}

export async function signInOTP(email: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  });
  console.log(data);
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  redirect(routes.login);
}

export async function getUser() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  return user;
}

export async function uploadDoc(file: File) {
  const supabase = await createClient();
  const user = await getUser();
  const userId = user?.data?.user?.id;
  const chatId = generateId();
  const filePath = `${userId}/${chatId}/${file.name}`;
  const { data, error } = await supabase.storage
    .from("docs")
    .upload(filePath, file, {
      contentType: "application/pdf",
    });
  await loadDocsIntoPinecone(file);
  await createChat(chatId, file.name, filePath);
}

export async function createChat(id: string, name: string, filePath: string) {
  const supabase = await createClient();
  const user = await getUser();
  const userId = user?.data?.user?.id;
  const { error } = await supabase.from("chats").insert([
    {
      id,
      name,
      created_by: userId,
      file_path: filePath,
    },
  ]);
  if (error) {
  } else {
    redirect(`${routes.chat.id}/${id}`);
  }
}

export async function getChats() {
  const supabase = await createClient();
  const user = await getUser();
  const userId = user?.data?.user?.id;
  const { data, error } = await supabase
    .from("chats")
    .select("id, name")
    .eq("created_by", userId)
    .order("created_at", { ascending: false });
  if (error) {
    return [];
  } else {
    return data;
  }
}

export async function renameChat(id: string, name: string) {
  const supabase = await createClient();
  const user = await getUser();
  const userId = user?.data?.user?.id;
  await supabase
    .from("chats")
    .update({ name })
    .eq("id", id)
    .eq("created_by", userId);
}

export async function deleteChat(id: string) {
  const supabase = await createClient();
  const user = await getUser();
  const userId = user?.data?.user?.id;
  const { error } = await supabase
    .from("chats")
    .delete()
    .eq("id", id)
    .eq("created_by", userId);
  console.log(error);
}

export async function getFileFromStorage() {
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from("docs")
    .download(
      "docs/8243ce8a-7c4f-4161-8f64-d54a3931edd8/daebad70-1d21-4ff3-9e20-61f0c2f812e2/research.pdf"
    );
  if (data) {
    return data;
  }
}
