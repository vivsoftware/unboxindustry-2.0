import Head from "next/head";
import React, { useState, useEffect, memo, useMemo, lazy, Suspense } from "react";
import BlogNoSidebarContain from "./layout/Blog";
import { CommonPath } from "../Components/Constant";
import BreadCrumb from "../Components/Element/BreadCrumb";
// import FlowerSubscribe from "../Components/FlowerDemo/FlowerSubscribe";
import Layout4 from "../Layout/Layout4";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Enquire from "./layout/Enquire";
import { fetchAPI } from "../Utils/api";
import { useRouter } from "next/router";
// import PaginationSidebar from "../Components/Blog/BlogNoSider/PaginationSidebar";

const FlowerSubscribeLazy = React.lazy(() => import("../Components/FlowerDemo/FlowerSubscribe"));
const PaginationSidebarLazy = React.lazy(() => import("../Components/Blog/BlogNoSider/PaginationSidebar"));


//Optimizating the code
//using server-side-rendering

export const getStaticProps = async ({ locale }) => {
  const blogsData = await fetchAPI("/blogs", {
    populate: "*",
    pagination: {
      start: 0,
      limit: -1,
    },
  });

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      blogsData: blogsData.data,
    },
  };
};

const BlogNoSidebar = memo(({ blogsData }) => {
  const [currentPages, setCurrentPage] = useState(0);
  const [totalproducts, settotalproducts] = useState(0);
  const [lastpage, setlastpage] = useState(0);

  // memoizing expensive caculations
  const itemsPerPage = 6;
  const totalItems = totalproducts;
  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  );

  useEffect(() => {
    settotalproducts(blogsData.length);
    setlastpage(Math.floor(blogsData.length / itemsPerPage) + 1);
  }, [blogsData, itemsPerPage]);

  const router = useRouter();
  const handlePageChange = (pageNumber) => {
    router.push(`/blogs?page=${pageNumber}`);
    setCurrentPage(pageNumber);
  };

  const renderButtons = useMemo(() => {
    const buttons = [];
    const totalPagesToShow = 3; // Change this value to control how many page buttons to show at a time

    for (let i = currentPages; i < currentPages + totalPagesToShow; i++) {
      buttons.push(
        <button
          key={i + 1}
          className={`btn pagination-prev-back ms-1 ${
            currentPages === i ? "active" : ""
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
  }, [currentPages]);

  return (
    <Layout4>
      <Head>
        <title>Blogs</title>
        / <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="Blogs" />
        <meta
          name="description"
          content="Industrial Automation Blog Best List. DH Robotics Electric Gripper, Inductive Sensors Di-Soric, Robotic Welding, What are servo grippers ?"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href={`${CommonPath}/favicon/2.png`}
          alt="unboxLogo"
        />
        <link rel="canonical" href="https://www.unboxindustry.com/blogs" />
      </Head>
      <BreadCrumb parent={''} title={''} />
      <h1 className="text-center mt-1 mb-2" style={{ fontSize: "30px" }}>Blogs</h1>
      <BlogNoSidebarContain pageNumber={currentPages} data={blogsData} itemsPerPage={itemsPerPage} />

      <div className="container text-center">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12">
            <button
              className="btn pagination-prev-back ms-1" onClick={() => handlePageChange(currentPages - 1)} disabled={currentPages === 0}
            >
              Prev
            </button>
            <button className="btn pagination-prev-back ms-1" onClick={() => handlePageChange(0)} >
              1
            </button>
            <button className="btn pagination-prev-back ms-1" onClick={() => handlePageChange(1)} >
              2
            </button>
            <span className='ms-1'>....</span>
            {currentPages > 2 && (
              <button className="btn pagination-prev-back ms-1" onClick={() => handlePageChange(currentPages)}>
                {currentPages}
              </button>
            )}
            {renderButtons}
            <button className="btn pagination-prev-back ms-1" onClick={() => handlePageChange(currentPages + 1)} disabled={currentPages === totalPages - 1}>
              Next
            </button>
          </div>
        </div>
      </div>

      <Enquire />
      <React.Suspense fallback={<div>Loading....</div>}>
        <FlowerSubscribeLazy />
        <PaginationSidebarLazy />
      </React.Suspense>
    </Layout4>
  );
});

export default BlogNoSidebar;
