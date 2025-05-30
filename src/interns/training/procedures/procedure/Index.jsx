import React, { useState } from "react";
import { useParams } from "react-router";
import _ from "lodash";
import {
  useGetInternQuery,
  useGetSignleProcedureQuery,
} from "../../../../services/api/internApiSlice";
import { useSelector } from "react-redux";
import ProcedureHeader from "./ProcedureHeader";
import ProcedureContent from "./ProcedureContent";

const Procedure = () => {
  const { id } = useSelector((state) => state.auth.user);
  const { procedureId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const { data: procedureData } = useGetSignleProcedureQuery({ procedureId });
  const { data: internData } = useGetInternQuery({ internId: id });

  return (
    <div className="p-6">
      <div className="bg-white rounded-md shadow-sm p-6 grid grid-cols-2 items-center gap-4">
        {/* Procedure header */}
        <ProcedureHeader
          editMode={editMode}
          setEditMode={setEditMode}
          procedureData={procedureData}
        />
        {/* Procedure content */}
        <ProcedureContent
          procedureData={procedureData}
          editMode={editMode}
          setEditMode={setEditMode}
          internData={internData}
        />
      </div>
    </div>
  );
};

export default Procedure;
