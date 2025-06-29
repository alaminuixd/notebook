import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitCard from "../components/RateLimitCard";
import axiosApi from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NoteNotFound from "../components/NoteNotFound";

const Home = () => {
  const [rateLimit, setRateLimit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axiosApi.get("/notes");
        setNotes(res.data);
        setRateLimit(false);
      } catch (error) {
        console.error("Error fetching notes.");
        // .response and .response.status comes with "axios"
        if (error.response.status === 429) {
          setRateLimit(true);
          setTimeout(() => setRateLimit(false), 5000);
        } else {
          toast.error("Failed to load notes!");
        }
      } finally {
        console.log(notes);
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);
  useEffect(() => console.log(notes), [notes]);
  return (
    <div className="min-h-screen">
      <Navbar />
      {rateLimit && <RateLimitCard />}
      <div className="max-w-7xl mx-auto p-4 mt-10">
        {loading && (
          <div className="text-center py-10">
            <p>Loading...</p>
          </div>
        )}
        {!loading && notes.length === 0 && !rateLimit && <NoteNotFound />}
        {notes.length > 0 && !rateLimit && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
