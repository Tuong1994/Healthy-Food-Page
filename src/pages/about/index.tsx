import { NextPage } from "next";
import { useLang } from "@/hooks";
import AboutBanner from "@/features/about/AboutBanner";
import AboutBlog from "@/features/about/AboutBlog";
import AboutCategory from "@/features/about/AboutCategory";
import AboutGuarantee from "@/features/about/AboutGuarantee";
import AboutStory from "@/features/about/AboutStory";

const About: NextPage = () => {
  const { lang } = useLang();
  return (
    <div className="about">
      <AboutBanner lang={lang} />
      <AboutGuarantee lang={lang} />
      <AboutBlog lang={lang} />
      <AboutStory lang={lang} />
      <AboutCategory lang={lang} />
    </div>
  );
};

export default About;
