"use client";

import { useEffect, useState } from "react";
import { commentService } from "@/services/client/comment.client";
import { isLoggedIn, getLoggedInUser } from "@/utils/blogauth.utils";
import type { Comment } from "@/types/blog.types";

export default function CommentSection({ blogId }: { blogId: number }) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [replyTo, setReplyTo] = useState<number | null>(null);
    const [replyText, setReplyText] = useState("");

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const loggedIn = isLoggedIn(); // ✅ NOW TRUE
    const user = getLoggedInUser(); // ✅ ALWAYS AVAILABLE

    useEffect(() => {
        commentService.getComments(blogId).then(setComments);
    }, [blogId]);

    /* ===== POST COMMENT ===== */
    const submitComment = async (e: React.FormEvent) => {
        e.preventDefault();

        await commentService.postComment({
            blogId,
            author: form.name,
            email: form.email,
            content: form.message,
        });

        setForm({ name: "", email: "", message: "" });
        setComments(await commentService.getComments(blogId));
    };

    /* ===== POST REPLY ===== */
    const submitReply = async (parentId: number) => {
        if (!replyText) return;

        await commentService.postComment({
            blogId,
            author: user.username,
            email: user.email,
            content: replyText,
            parent: parentId,
            isAuthor: true,
        });

        setReplyText("");
        setReplyTo(null);
        setComments(await commentService.getComments(blogId));
    };

    const parents = comments.filter((c) => !c.parent);
    const replies = comments.filter((c) => c.parent);
    const hasReply = (commentId: number) => {
        return replies.some(
            (reply) => reply.parent?.id === commentId
        );
    };

    return (
        <section className="mt-20">
            <h2 className="text-xl font-semibold mb-6">
                Comments ({comments.length})
            </h2>

            {/* ===== COMMENT FORM ===== */}
            <form
                onSubmit={submitComment}
                className="bg-gray-50 p-6 rounded-2xl mb-10 space-y-4"
            >
                <h3 className="font-medium">Leave a Comment</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        required
                        placeholder="Your Name"
                        className="input"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />
                    <input
                        required
                        type="email"
                        placeholder="Your Email"
                        className="input"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />
                </div>

                <textarea
                    required
                    placeholder="Your Comment"
                    className="input h-32"
                    value={form.message}
                    onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                    }
                />

                <button className="bg-red-600 text-white px-6 py-2 rounded-lg">
                    Post Comment
                </button>
            </form>

            {/* ===== COMMENTS ===== */}
            {parents.map((comment) => {
                const childReplies = replies.filter(
                    (r) => r.parent?.id === comment.id
                );

                return (
                    <div key={comment.id} className="mb-8">
                        {/* Parent */}
                        <div className="p-5 bg-white border rounded-2xl">
                            <strong>{comment.name}</strong>
                            <p className="mt-1 text-gray-700">
                                {comment.message}
                            </p>

                            {loggedIn && !hasReply(comment.id) && (
                                <button
                                    onClick={() => setReplyTo(comment.id)}
                                    className="text-sm text-red-600 mt-2"
                                >
                                    Reply
                                </button>
                            )}
                        </div>

                        {/* Reply box */}
                        {replyTo === comment.id &&
                            loggedIn &&
                            !hasReply(comment.id) && (
                                <div className="ml-10 mt-3">
                                    <textarea
                                        className="input h-24"
                                        placeholder="Write a reply..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                    />
                                    <button
                                        onClick={() => submitReply(comment.id)}
                                        className="mt-2 bg-red-600 text-white px-4 py-2 rounded"
                                    >
                                        Post Reply
                                    </button>
                                </div>
                            )}

                        {/* Replies */}
                        {childReplies.map((reply) => (
                            <div
                                key={reply.id}
                                className="ml-10 mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-xl"
                            >
                                <strong className="flex gap-2 items-center">
                                    {reply.name}
                                    {reply.isAuthor && (
                                        <span className="text-xs bg-red-500 text-white px-2 rounded">
                                            Official
                                        </span>
                                    )}
                                </strong>
                                <p className="mt-1 text-gray-700">
                                    {reply.message}
                                </p>
                            </div>
                        ))}
                    </div>
                );
            })}
        </section>
    );
}
