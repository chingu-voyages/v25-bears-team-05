import { IThread, IThreadComment } from "./thread.type";
export const MOCK_THREAD_COMMENTS: IThreadComment = {
  _id: "6780",
  postedByUserId: "Hnsd83",
  content: "some thread content",
  updatedAt: "06-06-2021",
  createdAt: "06-06-2021",
  parentThreadId: "parentThreadId",
  parentThreadVisibility: 0,
  parentThreadOriginatorId: "fakeId",
};

export const MOCK_THREAD_DATA: IThread = {
  _id: "fakeId",
  postedByUserId: "123456",
  threadType: 0,
  visibility: 0,
  content: {
    html: "test",
    hashTags: ["hash"],
    attachments: [],
    updatedAt: "06-06-2021",
    createdAt: "06-06-2021",
  },
  comments: [MOCK_THREAD_COMMENTS],
  likes: {},
  shares: {},
  updatedAt: "06-06-2021",
  createdAt: "06-06-2021",
};
