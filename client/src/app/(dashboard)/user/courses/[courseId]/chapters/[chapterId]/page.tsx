"use client";

import Loading from "@/components/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCourseProgressData } from "@/hooks/useCourseProgressData";
import React, { useRef } from "react";
import ReactPlayer from "react-player";

const Course = () => {
  const {
    user,
    courseId,
    chapterId,
    course,
    userProgress,
    currentSection,
    currentChapter,
    isLoading,
    isChapterCompleted,
    updateChapterProgress,
    hasMarkedComplete,
    setHasMarkedComplete,
  } = useCourseProgressData();

  

  const playerRef = useRef<ReactPlayer>(null);

  const handleProgress = ({ played }: { played: number }) => {
    if (
      played >= 0.8 &&
      !hasMarkedComplete &&
      currentChapter &&
      currentSection &&
      userProgress?.sections &&
      !isChapterCompleted()
    ) {
      setHasMarkedComplete(true);
      updateChapterProgress(
        currentSection.sectionId,
        currentChapter.chapterId,
        true
      );
    }
  };

  if (isLoading) return <Loading />;
  if (!user) return <div>Please sign in to view this course.</div>;
  if (!course || !userProgress) return <div>Error loading course.</div>;
  return (
    <div className="course">
      <div className="course__container">
        <div className="course__breadcrumb">
          <div className="course__path">
            {course.title} / {currentSection?.sectionTitle} /{" "}
            <span className="course__current-chapter">
              {currentChapter?.title}
            </span>
          </div>
          <h2 className="course__title">{currentChapter?.title}</h2>
          <div className="course__header">
            <div className="course__instructor">
              <Avatar className="course__avatar">
                <AvatarImage alt={course.teacherName} />
                <AvatarFallback className="course__avatar-fallback">
                  {course.teacherName[0]}
                </AvatarFallback>
              </Avatar>
              <span className="course__instructor-name">
                {course.teacherName}
              </span>
            </div>
          </div>
        </div>

        <Card className="course__video">
          <CardContent className="course__video-container">
            {currentChapter?.video ? (
              <ReactPlayer
                ref={playerRef}
                url={currentChapter.video as string}
                controls
                width="100%"
                height="100%"
                onProgress={handleProgress}
                config={{
                  file: {
                    attributes: {
                      controlsList: "nodownload",
                    },
                  },
                }}
              />
            ) : (
              <div className="course__no-video">
                No video available for this chapter
              </div>
            )}
          </CardContent>
        </Card>

        <div className="course__content">
          <Tabs defaultValue="Notes" className="course__tabs">
            <TabsList className="course__tabs-list">
              <TabsTrigger className="course__tab" value="Notes">
                Notes
              </TabsTrigger>
              <TabsTrigger className="course__tab" value="Resources">
                Resources
              </TabsTrigger>
              <TabsTrigger className="course__tab" value="Quiz">
                Quiz
              </TabsTrigger>
            </TabsList>

            <TabsContent className="course__tab-content" value="Notes">
              <Card className="course__tab-card">
                <CardHeader className="course__tab-header">
                  <CardTitle>Notes Content</CardTitle>
                </CardHeader>
                <CardContent className="course__tab-body">
                  {currentChapter?.content}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent className="course__tab-content" value="Resources">
              <Card className="course__tab-card">
                <CardHeader className="course__tab-header">
                  <CardTitle>Resources Content</CardTitle>
                </CardHeader>
                <CardContent className="course__tab-body">
                  {/* ADD RESOURCES CONTENT HERE */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent className="course__tab-content" value="Quiz">
              <Card className="course__tab-card">
                <CardHeader className="course__tab-header">
                  <CardTitle>QUIZ Content</CardTitle>
                </CardHeader>
                <CardContent className="course__tab-body">
                  {/* ADD QUIZ CONTENT HERE */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="course__instructor-card">
            <CardContent className="course__instructor-info">
              <div className="course__instructor-header">
                <Avatar className="course__instructor-avatar">
                  <AvatarImage alt={course.teacherName} />
                  <AvatarFallback className="course__instructor-avatar-fallback">
                    {course.teacherName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="course__instructor-details">
                  <h4 className="course__instructor-name">
                    {course.teacherName}
                  </h4>
                  <p className="course__instructor-title">Senior UX designer</p>
                </div>
              </div>
              <div className="course__instructor-bio">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                  iure ipsa sequi, eius nesciunt debitis officiis ipsam hic
                  deleniti dolorem magni, nulla necessitatibus? A, id ratione
                  laboriosam sapiente fuga corrupti.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Course;