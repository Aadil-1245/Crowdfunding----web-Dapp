import React, { useState, useEffect } from "react";

const PupUp = ({ setOpenModel, donate, donateCampaign, getDonations }) => {
  const [amount, setAmount] = useState("");
  const [allDonationData, setAllDonationData] = useState([]);

  const createDonation = async () => {
    if (!amount || isNaN(amount)) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      const data = await donate(donateCampaign.pId, amount);
      console.log(data);
      setOpenModel(false); // close modal on success
    } catch (error) {
      console.log("Donation failed:", error);
    }
  };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const donationData = await getDonations(donateCampaign.pId);
        setAllDonationData(donationData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDonations();
  }, [donateCampaign.pId, getDonations]);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* content */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{donateCampaign.title}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setOpenModel(false)}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block">
                  ×
                </span>
              </button>
            </div>
            {/* body */}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                {donateCampaign.description}
              </p>
              <input
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount in ETH"
                required
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
              />
              {allDonationData?.map((donation, i) => (
                <p key={i} className="my-4 text-slate-500 text-lg leading-relaxed">
                  {i + 1}: {donation.donation} ETH from{" "}
                  {donation.donator.slice(0, 35)}
                </p>
              ))}
            </div>
            {/* footer */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm"
                type="button"
                onClick={() => setOpenModel(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg"
                type="button"
                onClick={createDonation}
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default PupUp;
