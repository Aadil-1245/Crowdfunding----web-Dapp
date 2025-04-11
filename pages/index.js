import React, { useEffect, useContext, useState } from "react";

import { CrowdFundingContext } from "../Context/CrowdFunding";
import { Hero, Card, PupUp } from "../Components";

const index = () => {
  const {
    titleDate,
    getCampaign,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
  } = useContext(CrowdFundingContext);

  const [allcampaign, setAllcampaign] = useState();
  const [usercampaign, setUsercampaign] = useState();
  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const allData = await getCampaign();
      const userData = await getUserCampaigns();
      setAllcampaign(allData);
      setUsercampaign(userData);
    };
    fetchData();
  }, []);

  console.log(donateCampaign);

  return (
    <>
      <Hero titleData={titleDate} createCampaign={createCampaign} />

      <Card
        title="All Listed Campaign"
        allcampaign={allcampaign}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
      />

      <Card
        title="Your Created Campaign"
        allcampaign={usercampaign}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
      />

      {openModel && (
        <PupUp
          setOpenModel={setOpenModel}
          getDonation={getDonations}
          donate={donate}
          donateCampaign={donateCampaign}
        />
      )}
    </>
  );
};

export default index;
