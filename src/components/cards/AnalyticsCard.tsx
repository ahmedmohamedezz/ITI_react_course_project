import { useEffect, useState } from "react";
import {
  fetchUsers,
  fetchUserPostsCount,
  fetchUserCompletedTodosCount,
} from "../../apis/apis";
import type { UserType } from "../../types/types";

import { useQuery } from "@tanstack/react-query";

// to encapsulate all related data together
interface AnalyticsUser {
  user: UserType;
  count: number;
}

function AnalyticsCard() {
  const [mxPostsUser, setMxPostsUser] = useState<AnalyticsUser | undefined>(
    undefined
  );
  const [mnPostsUser, setMnPostsUser] = useState<AnalyticsUser | undefined>(
    undefined
  );
  const [mxTodosUser, setMxTodosUser] = useState<AnalyticsUser | undefined>(
    undefined
  );
  const [mnTodosUser, setMnTodosUser] = useState<AnalyticsUser | undefined>(
    undefined
  );
  const [analysing, setAnalysing] = useState<boolean>(true);

  const {
    data: users,
    error: usersError,
    isLoading: usersLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  async function analyse() {
    let mxPosts = Number.MIN_VALUE;
    let mnPosts = Number.MAX_VALUE;
    let mxTodos = Number.MIN_VALUE;
    let mnTodos = Number.MAX_VALUE;

    let mxPostsUser: AnalyticsUser | undefined;
    let mnPostsUser: AnalyticsUser | undefined;
    let mxTodosUser: AnalyticsUser | undefined;
    let mnTodosUser: AnalyticsUser | undefined;

    for (const user of users) {
      const [postsCount, todosCount] = await Promise.all([
        fetchUserPostsCount(user.id.toString()),
        fetchUserCompletedTodosCount(user.id.toString()),
      ]);

      if (postsCount > mxPosts) {
        mxPosts = postsCount;
        mxPostsUser = { user, count: postsCount };
      }

      if (postsCount < mnPosts) {
        mnPosts = postsCount;
        mnPostsUser = { user, count: postsCount };
      }

      if (todosCount > mxTodos) {
        mxTodos = todosCount;
        mxTodosUser = { user, count: todosCount };
      }

      if (todosCount < mnTodos) {
        mnTodos = todosCount;
        mnTodosUser = { user, count: todosCount };
      }
    }

    setMxPostsUser(mxPostsUser);
    setMnPostsUser(mnPostsUser);
    setMxTodosUser(mxTodosUser);
    setMnTodosUser(mnTodosUser);
    setAnalysing(false);
  }

  useEffect(() => {
    if (!users) return;
    analyse();
  }, [users]);

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Analytics Card
      </h2>

      {usersError ? (
        <div className="text-red-600 text-center font-medium">
          Unable to fetch users
        </div>
      ) : (
        ""
      )}

      {usersLoading ? (
        <div className="text-gray-600 text-center">Loading users ...</div>
      ) : (
        ""
      )}

      {!usersError && !usersLoading ? (
        analysing ? (
          <div className="text-gray-600 text-center py-4">
            Analysing Users data...
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-gray-800 font-medium">
                {mxPostsUser?.user.name}{" "}
                <span className="text-sm text-gray-600">
                  has the max number of posts:
                </span>{" "}
                {mxPostsUser?.count}
              </p>
              <p className="text-gray-800 font-medium mt-2">
                {mnPostsUser?.user.name}{" "}
                <span className="text-sm text-gray-600">
                  has the min number of posts:
                </span>{" "}
                {mnPostsUser?.count}
              </p>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <p className="text-gray-800 font-medium">
                {mxTodosUser?.user.name}{" "}
                <span className="text-sm text-gray-600">
                  has the max number of completed todos:
                </span>{" "}
                {mxTodosUser?.count}
              </p>
              <p className="text-gray-800 font-medium mt-2">
                {mnTodosUser?.user.name}{" "}
                <span className="text-sm text-gray-600">
                  has the min number of completed todos:
                </span>{" "}
                {mnTodosUser?.count}
              </p>
            </div>
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default AnalyticsCard;
