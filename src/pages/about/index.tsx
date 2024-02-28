import { GetServerSideProps, NextPage } from "next";
import { getSubCategories } from "@/services/subcategory/api";
import { useLang } from "@/hooks";
import type { ApiQuery, ApiResponse, List } from "@/services/type";
import type { SubCategory } from "@/services/subcategory/type";
import AboutBanner from "@/features/about/AboutBanner";
import AboutBlog from "@/features/about/AboutBlog";
import AboutCategory from "@/features/about/AboutCategory";
import AboutGuarantee from "@/features/about/AboutGuarantee";
import AboutStory from "@/features/about/AboutStory";

interface AboutProps {
  subCategoriesResponse: ApiResponse<List<SubCategory>>;
}

const About: NextPage<AboutProps> = ({ subCategoriesResponse }) => {
  const { lang } = useLang();

  return (
    <div className="about">
      <AboutBanner lang={lang} />
      <AboutGuarantee lang={lang} />
      <AboutBlog lang={lang} />
      <AboutStory lang={lang} />
      <AboutCategory lang={lang} subCategoriesResponse={subCategoriesResponse} />
    </div>
  );
};

export default About;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  const apiQuery = { ...query } as ApiQuery;
  const subCategoriesResponse = await getSubCategories(apiQuery);
  return {
    props: {
      subCategoriesResponse,
    },
  };
};
