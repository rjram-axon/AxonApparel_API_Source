using AxonApparel.Common;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public class WorkDivisionBusiness : IWorkDivisionBusiness
    {
        private IWorkDivisionRepository workdivrepo = new WorkDivisionRepository();

        public Response<IEnumerable<Domain.WorkDivision>> GetWorkDivision()
        {
            try
            {
                var workList = workdivrepo.GetDataListAll();
                return new Response<IEnumerable<Domain.WorkDivision>>(workList.Select(m => new Domain.WorkDivision
                    {
                        IsActive = m.IsActive ? "TRUE" : "FALSE",
                        WorkDivisionName = m.WorkDivision1,
                        //Inchargeid = (int)m.Inchargeid, 
                        WorkDivisionId = (int)m.WorkDivisionId,
                        UnitId = (int)m.Unitid,
                        DivisionType = m.DivisionType,
                    }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.WorkDivision>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        

        public Response<Domain.WorkDivision> GetWorkDivisionId(int WorkDivisionId)
        {
            try
            {

                var work = workdivrepo.GetDataById(WorkDivisionId);
                return new Response<Domain.WorkDivision>(new Domain.WorkDivision
                {
                    IsActive = work.IsActive ? "TRUE" : "FALSE",
                    WorkDivisionName = work.WorkDivision1,
                    //Inchargeid = (int)work.Inchargeid,
                    WorkDivisionId = (int)work.WorkDivisionId,
                    UnitId = (int)work.Unitid,
                    DivisionType = work.DivisionType,

                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<Domain.WorkDivision>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateWorkDivision(Domain.WorkDivision WorkDivisionAdd)
        {
            try
            {
                if (string.IsNullOrEmpty(WorkDivisionAdd.WorkDivisionName)) return new Response<int>(0, Status.ERROR, "Given Name of WorkDivision is empty");
                if (isNameAvailableAlready(WorkDivisionAdd, "ADD")) return new Response<int>(-1, Status.ERROR, "Given WorkDivision is already available");

                return new Response<int>(workdivrepo.AddData(new Repository.WorkDivision
                    {
                        WorkDivisionId = WorkDivisionAdd.WorkDivisionId,
                        WorkDivision1 = WorkDivisionAdd.WorkDivisionName,
                        //Inchargeid = WorkDivisionAdd.Inchargeid,  
                        Unitid = WorkDivisionAdd.UnitId,
                        DivisionType = WorkDivisionAdd.DivisionType,
                        IsActive = WorkDivisionAdd.IsActive.ToUpper() == "TRUE",
                    }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateWorkDivision(Domain.WorkDivision WorkDivisionUpd)
        {
            if (string.IsNullOrEmpty(WorkDivisionUpd.WorkDivisionName)) return new Response<bool>(false, Status.ERROR, "Given WorkDivision is empty");
            if (isNameAvailableAlready(WorkDivisionUpd, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given WorkDivision is already available");

            return new Response<bool>(workdivrepo.UpdateData(new Repository.WorkDivision
            {
                WorkDivisionId = WorkDivisionUpd.WorkDivisionId,
                WorkDivision1 = WorkDivisionUpd.WorkDivisionName,
                //Inchargeid = WorkDivisionUpd.Inchargeid,
                Unitid = WorkDivisionUpd.UnitId,
                DivisionType = WorkDivisionUpd.DivisionType,
                IsActive = WorkDivisionUpd.IsActive.ToUpper() == "TRUE",              

            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteWorkDivision(int WorkDivisionId)
        {
            return new Response<bool>(workdivrepo.DeleteData(WorkDivisionId), Status.SUCCESS, "Deleted Successfully");
        }

        private bool isNameAvailableAlready(Domain.WorkDivision work, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetWorkDivision().Value.Where(c => c.WorkDivisionName.ToUpper() == work.WorkDivisionName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetWorkDivision().Value.Where(c => c.WorkDivisionName.ToUpper() == work.WorkDivisionName.ToUpper() && c.WorkDivisionId != work.WorkDivisionId).ToList().Count > 0);
            }
            return false;
        }
    }


}