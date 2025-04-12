import React from "react";
import Layout from "@/components/layout/Layout";
import AchievementsView from "@/components/shared/AchievementsView";
import { NextPage } from "next";
import Head from "next/head";

const AchievementsPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Thành tựu | Math Fun QR</title>
        <meta name="description" content="Xem thành tựu học toán của bạn" />
      </Head>

      <div className="page-container">
        <h1 className="page-title">Thành tựu của bạn</h1>
        <div className="page-description">
          <p>
            Hãy tiếp tục hoàn thành các thử thách để đạt được nhiều thành tựu
            hơn!
          </p>
        </div>

        <div className="achievements-page-content">
          <AchievementsView />
        </div>
      </div>
    </Layout>
  );
};

export default AchievementsPage;
