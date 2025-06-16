import React, { useState } from "react";
import { useParams } from "react-router";
import _ from "lodash";
import { useGetProcedureQuery } from "../../../../services/intern/api/hooks/proceduresHooks";
import { useSelector } from "react-redux";
import EditHeader from "../../components/edit/EditHeader";
import ProcedureContent from "./ProcedureContent";
import { useIntern } from "../../../../services/intern/api/hooks/authHooks";

const Procedure = () => {
  const { role, id } = useSelector((state) => state.auth.user);
  const { procedureId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const { data: procedureData } = useGetProcedureQuery({ procedureId });
  const { internData } = useIntern({
    userRole: role,
    userId: id,
    internId: id,
  });

  return (
    <div className="p-6 pt-0">
      <div className="bg-white rounded-md shadow-sm p-6 grid grid-cols-2 items-center gap-4">
        {/* Procedure header */}
        <EditHeader
          editMode={editMode}
          setEditMode={setEditMode}
          objectData={procedureData?.data?.procedureState}
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
