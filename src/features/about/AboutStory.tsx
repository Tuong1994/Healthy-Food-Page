import React from "react";
import { UI } from "@/components";
import { Lang } from "@/common/type";

const { Section, Space, Avatar, Image, Divider, Grid, Typography } = UI;

const { Row, Col } = Grid;

const { Title, Paragraph } = Typography;

interface AboutStoryProps {
  lang: Lang;
}

const AboutStory: React.FC<AboutStoryProps> = ({ lang }) => {
  const stories = [
    {
      id: "1",
      author: "Benno Bento",
      content: lang.about.story.content_1,
      position: lang.about.story.owner,
      img: "/about/benno.svg",
    },
    {
      id: "2",
      author: "Lilliput Diamond",
      content: lang.about.story.content_2,
      position: lang.about.story.owner,
      img: "/about/liliiput.svg",
    },
    {
      id: "3",
      author: "Lay Haye Kitchen & Bar",
      content: lang.about.story.content_3,
      position: lang.about.story.supply,
      img: "/about/haye.svg",
    },
    {
      id: "4",
      author: "Sweet Song",
      content: lang.about.story.content_4,
      position: lang.about.story.supply,
      img: "/about/sweet.webp",
    },
    {
      id: "5",
      author: "Maison Marou",
      content: lang.about.story.content_5,
      position: lang.about.story.supply,
      img: "/about/maison.svg",
    },
    {
      id: "6",
      author: "The Tangerine",
      content: lang.about.story.content_6,
      position: lang.about.story.chef,
      img: "/about/tangerine.webp",
    },
  ];

  const renderStory = () => {
    return stories.map((story) => (
      <Col key={story.id} xs={24} md={12} lg={12} span={8}>
        <Paragraph size={16} align="justify" rootClassName="story-content">
          {story.content}
        </Paragraph>
        <Space align="middle">
          <Avatar size={60}>
            <Image src={story.img} imgWidth="100%" />
          </Avatar>
          <div>
            <Paragraph strong size={18} rootClassName="story-author">
              {story.author}
            </Paragraph>
            <Paragraph variant="secondary" size={13}>{story.position}</Paragraph>
          </div>
        </Space>
      </Col>
    ));
  };

  return (
    <Section rootClassName="about-story">
      <Title align="center" weight={700} rootClassName="story-title">
        {lang.about.story.title}
      </Title>
      <Divider />
      <Row gutters={[30, 10]} justify="between">
        {renderStory()}
      </Row>
    </Section>
  );
};

export default AboutStory;
