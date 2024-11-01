import { div } from "framer-motion/client";
import TheHeading from "../components/TheHeading";
import { UseFetchCollection } from "../firebase/config";

function Dashboard() {
    const dashbordDetails = UseFetchCollection("dashboard");
  console.log(dashbordDetails);

  const { whatsapp, url } = dashbordDetails[0] || { whatsapp: 0, url: 0 };

    return ( 
        <div className="bg-primary flex flex-col w-full justify-center px-10 py-10">
            <TheHeading heading="DASHBOARD"/>
            <div className="bg-white p-4 rounded-lg flex gap-8 mx-auto shadow-cardShadow mt-10">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <p className="text-sm text-textHead font-semibold">Whatsapp Sharing</p>
                    <h4 className="text-textpara text-2xl font-bold">{whatsapp}</h4>
                </div>
                <div className="w-[3px] bg-secondary"></div>
                <div className="flex flex-col gap-2 justify-center items-center">
                    <p className="text-sm text-textHead font-semibold">URL Sharing</p>
                    <h4 className="text-textpara text-2xl font-bold">{url}</h4>
                </div>
                <div className="w-[3px] bg-secondary"></div>
                <div className="flex flex-col gap-2 justify-center items-center">
                    <p className="text-sm text-textHead font-semibold">Feedbacks</p>
                    <h4 className="text-textpara text-2xl font-bold">10</h4>
                </div>
            </div>
        </div>
     );
}

export default Dashboard;