using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public class ApprovalBusiness : IApprovalBusiness
    {
        IApprovalRepository AppRep = new ApprovalRepository();

        public Response<IEnumerable<Domain.Approval>> GetApproval()
        {
            try
            {

                var AppList = AppRep.GetDataListAll();

                return new Response<IEnumerable<Domain.Approval>>(AppList.Select(m => new Domain.Approval
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    ApprovalDays = m.ApprovalDays,
                    ApprovalName = m.ApprovalTitle,
                    ApprovalId = m.ApprovalId,
                    ColorNo = m.ColorNo,
                    Description = m.Description
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.Approval>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.Approval> GetDataById(int ApprovalId)
        {
            try
            {
                var AppList = AppRep.GetDataById(ApprovalId);
                return new Response<Domain.Approval>(new Domain.Approval
                {
                    ApprovalName = AppList.ApprovalTitle,
                    ApprovalId = AppList.ApprovalId,
                    IsActive = AppList.IsActive ? "TRUE" : "FALSE",
                    ColorNo = AppList.ColorNo,
                    Description = AppList.Description,
                    ApprovalDays = AppList.ApprovalDays
                }, Status.SUCCESS, "Fetched Successfully");

            }
            catch
            {
                return new Response<Domain.Approval>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateApproval(Domain.Approval objApp)
        {
            try
            {
                if (string.IsNullOrEmpty(objApp.ApprovalName)) return new Response<int>(0, Status.ERROR, "Given Approval is empty");
                if (isNameAvailableAlready(objApp, "ADD")) return new Response<int>(-1, Status.ERROR, "Given Approval is already available");

                return new Response<int>(AppRep.AddData(new AxonApparel.Repository.Approval
                {
                    ApprovalTitle = objApp.ApprovalName,
                    ApprovalDays = (short)objApp.ApprovalDays,
                    ApprovalId = objApp.ApprovalId,
                    IsActive = objApp.IsActive.ToUpper() == "TRUE",
                    ColorNo = objApp.ColorNo,
                    Description = objApp.Description,

                }), Status.SUCCESS, "Added Successfully");

            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
            

        public Response<bool> UpdateApproval(Domain.Approval Approval)
        {
            if (string.IsNullOrEmpty(Approval.ApprovalName)) 
                return new Response<bool>(false, Status.ERROR, "Given Approval is empty");
            if (isNameAvailableAlready(Approval, "UPDATE")) 
                return new Response<bool>(false, Status.EXISTS, "Given Approval is already available");

            return new Response<bool>(AppRep.UpdateData(new Repository.Approval
            {
                ApprovalTitle = Approval.ApprovalName,
                ApprovalDays = (short)Approval.ApprovalDays,
                ApprovalId = Approval.ApprovalId,
                IsActive = Approval.IsActive.ToUpper() == "TRUE",
                ColorNo = Approval.ColorNo,
                Description = Approval.Description,
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteApproval(int ApprovalId)
        {
            return new Response<bool>(AppRep.DeleteData(ApprovalId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.Approval Appl, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetApproval().Value.Where(c => c.ApprovalName.ToUpper() == Appl.ApprovalName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetApproval().Value.Where(c => c.ApprovalName.ToUpper() == Appl.ApprovalName.ToUpper() && c.ApprovalId != Appl.ApprovalId).ToList().Count > 0);
            }
            return false;

        }
    }
}
