import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { Link, useLocation, matchPath, useParams } from "react-router";
// Route configuration with breadcrumb labels
const routeConfig = [
  { path: "/", label: "Home" },
  { path: "/training", label: "Training" },
  { path: "/training/cases", label: "Cases" },
  { path: "/training/procedures", label: "Procedures" },
  { path: "/training/self-learning-activities", label: "Self Learning" },
  { path: "/training/direct-learning-activities", label: "Direct Learning" },
];

const TrainingBreadcrumbs = () => {
  const location = useLocation();
  const params = useParams();

  // Generate breadcrumb items based on current path
  const breadcrumbItems = React.useMemo(() => {
    const items = [];
    let accumulatedPath = "";

    // Split path and match against our route config
    location.pathname
      .split("/")
      .filter(Boolean)
      .forEach((pathSegment, index, segments) => {
        accumulatedPath += `/${pathSegment}`;

        // Find matching route config
        const route = routeConfig.find((r) => {
          const match = matchPath(r.path, accumulatedPath);
          return match && match.pathname === accumulatedPath;
        });

        if (route) {
          items.push({
            path: accumulatedPath,
            label: route.label,
            isLast: index === segments.length - 1,
          });
        } else {
          // Fallback for dynamic segments (like IDs)
          items.push({
            path: accumulatedPath,
            label: pathSegment.replace(/-/g, " "),
            isLast: index === segments.length - 1,
          });
        }
      });

    // Always include home if not already present
    if (!items.some((item) => item.path === "/")) {
      items.unshift({
        path: "/",
        label: "Home",
        isLast: false,
      });
    }

    return items;
  }, [location.pathname]);
  return (
    <div role="presentation" className="p-3 rounded-xl">
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        {breadcrumbItems.map((item, index) => {
          return item.isLast ? (
            <Chip
              key={index}
              label={
                params.caseId
                  ? "case-" + item.label.slice(-4)
                  : params.procedureId
                  ? "procedure-" + item.label.slice(-4)
                  : params.activityId
                  ? "activity-" + item.label.slice(-4)
                  : item.label
              }
              className={` ${
                item.path === location.pathname && "!bg-lightBlue !text-white"
              }`}
            />
          ) : (
            <Link
              key={index}
              to={item.path}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Chip component="span" label={item.label} />
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default TrainingBreadcrumbs;
