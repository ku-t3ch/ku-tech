import { Avatar, Text } from "@nextui-org/react";
import { NextPage } from "next";
import AvatarComponent from "@/components/AvatarComponent";
import { Tag } from "@/interfaces/TagsInterface";
import { useState, useRef } from "react";
import Xarrow from "react-xarrows";

interface Member {
  first_name_th: string | null;
  last_name_th: string | null;
  nick_name: string | null;
  year: number | null;
  faculty: string | null;
  major: string | null;
  core_team_profile_image_path: string | null;
}

interface RequestUser {
  first_name_th: string | null;
  last_name_th: string | null;
  nick_name: string | null;
  year: number | null;
  faculty: string | null;
  major: string | null;
  core_team_profile_image_path: string | null;
}

interface FindTagResponse {
  request_user: RequestUser[];
  childTags: {
    name: string;
  }[];
}

interface MemberComponentProps {
  id: string;
  tagName: string;
  parentTagName?: string;
  headTagName?: string;
  findName(name: string): Member[];
  findTag(name: string): (Tag & FindTagResponse)[];
}

const MembersComponent: NextPage<MemberComponentProps> = (props) => {
  const [currentTag, setTag] = useState(() => {
    return props.findTag(props.tagName)[0];
  })

  const getChildClassName = (parentTagName: string | undefined) => {
    return parentTagName == undefined ? "flex w-full justify-center gap-20 mt-20 content-start" : "flex flex-col mt-20 ml-[14rem] relative bottom-0";
  }

  const getClassName = (parentTagName: string | undefined) => {
    return parentTagName == undefined ? "flex flex-col justify-items-center items-center" : "flex flex-col";
  }

  const childSection = () => {
    return (
      <div className={getChildClassName(props.parentTagName)}>
        {currentTag?.childTags?.map((tag, index) => {
          return (
            <div className="mt-10" key={index}>
              {props.findName(tag.name).length > 0 &&
                <>
                  <MembersComponent
                    id={tag.name}
                    tagName={tag.name}
                    findName={props.findName}
                    findTag={props.findTag}
                    parentTagName={props.tagName}
                    headTagName={props.headTagName}
                  />
                </>
              }
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={getClassName(props.parentTagName)}>
      {currentTag?.request_user?.map((tag, index) => (
        <div className="mb-8">
          <AvatarComponent
            id={props.id + "-" + index}
            {...tag}
            key={index}
            position={props.tagName}
          />
          {props.parentTagName !== undefined &&
            <Xarrow
              start={props.parentTagName + "-0"}
              end={props.id + "-" + index}
              startAnchor={"bottom"}
              endAnchor={props.parentTagName == props.headTagName ? "top" : "left"}
              color={"grey"}
              strokeWidth={1.5}
              path={"grid"}
              showHead={false}
            />}
        </div>

      ))}
      {currentTag!.childTags?.length > 0 && childSection()}
    </div>
  )
}

export default MembersComponent;