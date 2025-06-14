import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitCard from "../components/RateLimitCard";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const [rateLimit, setRateLimit] = useState(false);
  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/notes");
        setNote(res.data);
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
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);
  console.log(note);
  return (
    <div className="min-h-screen">
      <Navbar />
      {rateLimit && <RateLimitCard />}
    </div>
  );
};

export default Home;
