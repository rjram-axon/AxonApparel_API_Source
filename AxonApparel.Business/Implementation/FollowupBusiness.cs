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
    public class FollowupBusiness : IFollowUpBusiness
    {
        private IFollowupRepository followRepo = new FollowUpRepository();

        public Response<IQueryable<Domain.Followup>> GetFollowup()
        {
            try
            {
                var couList = followRepo.GetDataList();
                return new Response<IQueryable<Domain.Followup>>(couList.Select(m => new Domain.Followup
                {
                    FollowId = m.Id,
                    CompanyId = m.CompanyId,
                    CompanyName = "Axon",
                    BuyerId = (int)m.BuyerId,
                    BuyerName = "Test Buyer",
                    EntryNo = m.EntryNo,
                    FollowDate = (DateTime)m.Date,
                    EnquiryId = (int)m.Enquiryid,
                    Statusid = (int)m.Statusid,
                    EmployeeId = (int)m.EmployeeId,
                    EmployeeName = m.Employee.Employee1,
                    QuotationNo = m.QuotationNo,
                    QuotationStyle = m.QuotationStyle,
                    QuoDate = (DateTime)m.QuoDate,
                    Action = m.Action,
                    ToContact = m.ToContact,
                    NextFollowDate = (DateTime)m.NextFollowDate,
                    Remarks = m.Remarks,

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.Followup>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.Followup> GetFollowupId(int followId)
        {
            try
            {
                var follow = followRepo.GetDataById(followId);
                return new Response<Domain.Followup>(new Domain.Followup
                {
                    FollowId = follow.Id,
                    CompanyId = follow.CompanyId,
                    BuyerId = (int)follow.BuyerId,
                    EntryNo = follow.EntryNo,
                    FollowDate = (DateTime)follow.Date,
                    EnquiryId = (int)follow.Enquiryid,
                    Statusid = (int)follow.Statusid,
                    EmployeeId = (int)follow.EmployeeId,
                    QuotationNo = follow.QuotationNo,
                    QuotationStyle = follow.QuotationStyle,
                    QuoDate = (DateTime)follow.QuoDate,
                    Action = follow.Action,
                    ToContact = follow.ToContact,
                    NextFollowDate = (DateTime)follow.NextFollowDate,
                    Remarks = follow.Remarks,
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.Followup>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateFollowup(Domain.Followup FollowupUpd)
        {
            //if (string.IsNullOrEmpty(CityUpd.CityName)) return new Response<bool>(false, Status.ERROR, "Given CountryName of Country is empty");
            //if (isNameAvailableAlready(CityUpd, "UPDATE")) return new Response<bool>(false, Status.ERROR, "Given mode of shipment is already available");

            return new Response<bool>(followRepo.UpdateData(new Repository.Followup
            {
                Id = FollowupUpd.FollowId,
                CompanyId = FollowupUpd.CompanyId,
                BuyerId = (int)FollowupUpd.BuyerId,
                EntryNo = FollowupUpd.EntryNo,
                Date = (DateTime)FollowupUpd.FollowDate,
                Enquiryid = FollowupUpd.EnquiryId,
                Statusid = (int)FollowupUpd.Statusid,
                EmployeeId = (int)FollowupUpd.EmployeeId,
                QuotationNo = FollowupUpd.QuotationNo,
                QuotationStyle = FollowupUpd.QuotationStyle,
                QuoDate = (DateTime)FollowupUpd.QuoDate,
                Action = FollowupUpd.Action,
                ToContact = FollowupUpd.ToContact,
                NextFollowDate = (DateTime)FollowupUpd.NextFollowDate,
                Remarks = FollowupUpd.Remarks,
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteFollow(int FollowupId)
        {
            return new Response<bool>(followRepo.DeleteData(FollowupId), Status.SUCCESS, "Deleted Successfully");
        }

        public Response<int> CreateFollowup(Domain.Followup FollowupAdd)
        {
            try
            {
                //if (string.IsNullOrEmpty(CityAdd.CityName)) return new Response<int>(0, Status.ERROR, "Given Name of City is empty");
                //if (isNameAvailableAlready(CityAdd, "ADD")) return new Response<int>(0, Status.ERROR, "Given mode of City is already available");

                return new Response<int>(followRepo.AddData(new Repository.Followup
                {
                    Id = FollowupAdd.FollowId,
                    EntryNo = FollowupAdd.EntryNo,
                    BuyerId = FollowupAdd.BuyerId,
                    CompanyId = FollowupAdd.CompanyId,
                    Enquiryid = FollowupAdd.EnquiryId,
                    Date = FollowupAdd.FollowDate,
                    Statusid = FollowupAdd.Statusid,
                    EmployeeId = FollowupAdd.EmployeeId,
                    QuotationNo = FollowupAdd.QuotationNo,
                    QuoDate = FollowupAdd.QuoDate,
                    QuotationStyle = FollowupAdd.QuotationStyle,
                    Action = FollowupAdd.Action,
                    ToContact = FollowupAdd.ToContact,
                    NextFollowDate = FollowupAdd.NextFollowDate,
                    Remarks = FollowupAdd.Remarks,
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
