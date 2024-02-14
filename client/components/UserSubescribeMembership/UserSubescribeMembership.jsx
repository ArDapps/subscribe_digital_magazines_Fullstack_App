"use client";
import {
  useCancelSubscribeMutation,
  useGetUserSubscribtionsQuery,
} from "@/redux/slices/RTK/subscribeSlice";
import { DateHumanConverter } from "@/utils/DateHumanConverter";

const UserSubescribeMembership = () => {
  const {
    isLoading,
    data: subscribtions,
    isError,
    refetch,
  } = useGetUserSubscribtionsQuery();

  console.log(subscribtions);

  const [cancelSubscribe, { isLoading: isCancelLoading, isSuccess }] =
    useCancelSubscribeMutation();
  const cancelMembership = async (subscriptionId) => {
    try {
      await cancelSubscribe(subscriptionId);
      // Optionally, you can refetch the subscriptions after cancellation
      refetch();
    } catch (error) {
      console.error("Error cancelling subscription:", error);
    }
  };
  return (
    <div>
      <p className="text-2xl text-bold bg-main-blue text-white m-3 p-3 w-[400px]">
        My Subscribtions
      </p>

      <div className=" z-10 max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
        {subscribtions &&
          subscribtions.subscribers &&
          subscribtions.subscribers.map((subscribe, index) => (
            <div className="p-3 m-3 w-full ">
              <p className="text-xl">
                {" "}
                <span className="text-main-blue">Magazine Name</span>{" "}
                {subscribe.magazine.title}
              </p>
              <p className="text-red-500 ">
                <span className="text-main-blue">Subscrition Ended at:</span>{" "}
                {DateHumanConverter(subscribe.endTime)}
              </p>

              {subscribe.isActive ? (
                <button
                  onClick={() => cancelMembership(subscribe.id)}
                  className="  hover:bg-slate-600  bg-red-500 text-white font-medium rounded-xl text-sm  mx-auto container py-3"
                >
                  Cancel Subscribe
                </button>
              ) : (
                <button className="  hover:bg-slate-600  bg-slate-500 text-white font-medium rounded-xl text-sm  mx-auto container py-3">
                  Subscribtion Canceled
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserSubescribeMembership;
