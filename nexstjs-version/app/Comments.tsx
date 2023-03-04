import EditableComments from "./EditableComments";

const fetchComments = () =>
  new Promise<string[]>((resolve) =>
    setTimeout(() => resolve(["Comment 1", "Comment 2", "Comment 3"]), 2000)
  );

export default async function Comments() {
  const comments = (await fetchComments()) as string[];
  return <EditableComments comments={comments} />;
}
