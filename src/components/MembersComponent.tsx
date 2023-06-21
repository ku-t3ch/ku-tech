import { NextPage } from "next";
import AvatarComponent from "@/components/AvatarComponent";
import { Tag } from "@/interfaces/TagsInterface";
import { useState } from "react";
import Xarrow, { useXarrow } from "react-xarrows";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

interface Member {
  first_name_th: string | null;
  last_name_th: string | null;
  nick_name: string | null;
  year: number | null;
  faculty: string | null;
  major: string | null;
  core_team_profile_image_path: string | null;
}

interface FindTagResponse {
  request_user: Member[];
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
  const updateXarrow = useXarrow();
  const [showChildNode, setShowChildNode] = useState(false);

  const getChildClassName = (parentTagName: string | undefined) => {
    return parentTagName == undefined ? "flex w-full justify-center gap-20 mt-20 content-start" : "flex flex-col mt-10 ml-[14rem] relative bottom-0";
  }

  const getClassName = (parentTagName: string | undefined) => {
    return parentTagName == undefined ? "flex flex-col justify-items-center items-center" : "flex flex-col";
  }

  const handleShowChildNode = () => {
    setShowChildNode(!showChildNode);
    updateXarrow();
  }

  // Please find better way to do this
  const shouldShowButton = () => {
    for (let i = 0; i < currentTag!.childTags!.length; i++) {
      if (props.findName(currentTag!.childTags![i]!.name).length > 0) {
        return true;
      }
    }
    return false;
  }

  const iconButton = () => {
    return (
      <>
        <button type="button" className="text-white bg-stone-600 hover:bg-stone-700 font-medium rounded-full text-sm p-1 text-center inline-flex items-center absolute bottom-1.5" onClick={handleShowChildNode}>
          <FontAwesomeIcon className="w-3 h-3 m-auto" icon={showChildNode ? faMinus : faPlus} />
        </button>
      </>
    )
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
        <>
          <div className="mt-8 z-0">
            <AvatarComponent
              id={props.id + "-" + index}
              {...tag}
              key={index}
              position={props.tagName}
              button={iconButton()}
              showButton={shouldShowButton()}
            />
            {props.parentTagName !== undefined &&
              <Xarrow
                start={props.parentTagName + "-0"}
                end={props.id + "-" + index}
                startAnchor={"bottom"}
                endAnchor={props.parentTagName == props.headTagName ? "top" : "left"}
                color={"#3D3D3D"}
                strokeWidth={2}
                path={"grid"}
                showHead={false}
                zIndex={100}
              />}
          </div>
        </>
      ))}
      {currentTag!.childTags?.length > 0 && showChildNode && childSection()}
    </div>
  )
}

export default MembersComponent;