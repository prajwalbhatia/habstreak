import { Skeleton } from "@mui/material";

export const activityTitle = (type: string, title: string) => {
  switch (type) {
    case "create-streak":
      return `A new streak named as ${title} is created`;
    case "delete-streak":
      return `A streak named as ${title} is deleted`;
    case "update-streak":
      return `A streak named as ${title} is updated`;
    case "create-reward":
      return `A new reward named as ${title} is created`;
    case "delete-reward":
      return `A new reward named as ${title} is deleted`;
    case "reward-earned":
      return `A reward named as ${title} is earned`;
    case "update-reward":
      return `A reward named as ${title} is updated`;
    default:
      return "No type is found";
  }
};

export const iconType = (type: string) => {
  switch (type) {
    case "create-streak":
      return (
        <i className="demo-icon icon-streak" style={{ color: "#F96E46" }} />
      );
    case "delete-streak":
      return (
        <i className="demo-icon icon-delete" style={{ color: "#D63E3E" }} />
      );
    case "update-streak":
    case "update-reward":
      return <i className="demo-icon icon-edit" style={{ color: "#689669" }} />;
    case "create-reward":
      return (
        <i className="demo-icon icon-reward" style={{ color: "#F96E46" }} />
      );
    case "delete-reward":
      return (
        <i className="demo-icon icon-delete" style={{ color: "#D63E3E" }} />
      );
    case "reward-earned":
      return (
        <i className="demo-icon icon-reward" style={{ color: "#FFCB47" }} />
      );
    default:
      return "No type is found";
  }
};
