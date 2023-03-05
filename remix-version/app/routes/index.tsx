import { Suspense, useState, use } from "react";
import { useLoaderData } from "@remix-run/react";
import { defer } from "@remix-run/node";
import styles from "../../styles/globals.css";

const fetchDescription = () =>
  new Promise<string>((resolve) =>
    setTimeout(() => resolve("Product information ready for SEO"), 100)
  );

const fetchComments = () =>
  new Promise<string[]>((resolve) =>
    setTimeout(() => resolve(["Comment 1", "Comment 2", "Comment 3"]), 2000)
  );

function Comments({ comments: commentPromise }: { comments: string[] }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<string[]>(use(commentPromise));
  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>

      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        onClick={() => {
          setComments([...comments, newComment]);
          setNewComment("");
        }}
      >
        Add Comment
      </button>
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader() {
  const description = await fetchDescription();
  const comments = fetchComments() as Promise<string[]>;

  return defer({
    description,
    comments,
  });
}

export default function Index() {
  const { description, comments } = useLoaderData();

  return (
    <>
      <header>Header</header>

      <h2>Product Description</h2>
      <p>{description}</p>
      <Suspense fallback={<div>loading...</div>}>
        <Comments comments={comments} />
      </Suspense>

      <footer>Footer</footer>
    </>
  );
}
