// import Success from "../ui/Success";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEditVideoMutation } from "../../features/api/apiSlice";

import Error from "../ui/Error";
import Success from "../ui/Success";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";

export default function Form({ video }) {
  const [title, setTitle] = useState(video.title);
  const [author, setAuthor] = useState(video.author);
  const [description, setDescription] = useState(video.description);
  const [link, setLink] = useState(video.link);
  const [thumbnail, setThumbnail] = useState(video.thumbnail);
  const [date, setDate] = useState(video.date);
  const [duration, setDuration] = useState(video.duration);
  const [views, setViews] = useState(video.views);
  const { videoId } = useParams();

  const [editVideo, { data, isLoading, isError, isSuccess }] =
    useEditVideoMutation();

  const reset = () => {
    setThumbnail("");
    setAuthor("");
    setTitle("");
    setDuration("");
    setLink("");
    setViews("");
    setDescription("");
    setDate("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editVideo({
      id: videoId,
      data: {
        title,
        author,
        description,
        link,
        thumbnail,
        date,
        duration,
        views,
      },
    });
    reset();
  };
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <TextInput
                value={title}
                title="Video Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="col-span-6">
              <TextArea
                title="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="YouTube Video link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="Thumbnail link"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <TextInput
                title="Upload Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video no of views"
                value={views}
                onChange={(e) => setViews(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
          >
            Update
          </button>
        </div>

        {isSuccess && <Success message="Video was added successfully" />}
        {isError && <Error message="There was an error" />}
      </div>
    </form>
  );
}
