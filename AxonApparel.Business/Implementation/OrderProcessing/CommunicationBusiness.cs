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
    public class CommunicationBusiness:ICommunicationBusiness
    {
        ICommunicationRepository CommRepo = new CommunicationRepository();

        public Common.Response<IQueryable<Domain.Communication>> GetCommunication()
        {
            try
            {
                var commuList = CommRepo.GetDataList();
                return new Response<IQueryable<Domain.Communication>>(commuList.Select(m => new Domain.Communication
                {
                    CommunicationId=m.Id,
                    CompanyId = m.Companyid, 
                    CompanyName=m.Company.Company1,               
                    BuyerId = (int)m.Buyerid,
                    SupplierId = (int)m.Supplierid,
                    AgentId = (int)m.Agentid,
                    Others = m.Others,
                    EntryNo = m.EntryNo,
                    EntryDate = (DateTime)m.EntryDate,
                    RefNo = m.RefNo,
                    RefDate = (DateTime)m.RefDate,
                    EnquiryNo = m.EnquiryNo,
                    OrderNo = m.OrderNo,
                    OrderRefNo = m.OrderRefNo,
                    MiscRefNo = m.MiscRefNo,
                    CompanyType = m.CompanyType,
                    From = (DateTime)m.From,
                    To = (DateTime)m.To,
                    ComModeTypeId = (int)m.CompanyModeid,
                    Subject = m.Subject,
                    Description = m.Description,
                    Inward = m.Inward,
                    Remarks = m.Remarks,
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.Communication>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<Domain.Communication> GetCommunicationId(int communicationId)
        {
            try
            {
                var cou = CommRepo.GetDataById(communicationId);
                return new Response<Domain.Communication>(new Domain.Communication
                {
                    CommunicationId=cou.Id,
                    CompanyId=cou.Companyid,
                    BuyerId=(int)cou.Buyerid,
                    SupplierId = (int)cou.Supplierid,
                    AgentId = (int)cou.Agentid,
                    Others=cou.Others,
                    EntryNo=cou.EntryNo,
                    EntryDate=(DateTime)cou.EntryDate,
                    RefNo=cou.RefNo,
                    RefDate=(DateTime)cou.RefDate,
                    EnquiryNo=cou.EnquiryNo,
                    OrderNo=cou.OrderNo,
                    OrderRefNo=cou.OrderRefNo,
                    MiscRefNo=cou.MiscRefNo,
                    CompanyType=cou.CompanyType,
                    From=(DateTime)cou.From,
                    To=(DateTime)cou.To,
                    ComModeTypeId=(int)cou.CompanyModeid,
                    Subject=cou.Subject,
                    Description=cou.Description,
                    Inward=cou.Inward,
                    Remarks=cou.Remarks,
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.Communication>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<int> CreateCommunication(Domain.Communication CommunicationAdd)
        {
            try
            {
                //if (string.IsNullOrEmpty(CityAdd.CityName)) return new Response<int>(0, Status.ERROR, "Given Name of City is empty");
                //if (isNameAvailableAlready(CityAdd, "ADD")) return new Response<int>(0, Status.ERROR, "Given mode of City is already available");

                return new Response<int>(CommRepo.AddData(new Repository.Communication
                {
                    Companyid = CommunicationAdd.CompanyId,
                    Buyerid =(int) CommunicationAdd.BuyerId,
                    Supplierid = (int)CommunicationAdd.SupplierId,
                    Agentid = (int)CommunicationAdd.AgentId,
                    Others = CommunicationAdd.Others,
                    EntryNo = CommunicationAdd.EntryNo,
                    EntryDate = (DateTime)CommunicationAdd.EntryDate,
                    RefNo = CommunicationAdd.RefNo,
                    RefDate = (DateTime)CommunicationAdd.RefDate,
                    EnquiryNo = CommunicationAdd.EnquiryNo,
                    OrderNo = CommunicationAdd.OrderNo,
                    OrderRefNo = CommunicationAdd.OrderRefNo,
                    MiscRefNo = CommunicationAdd.MiscRefNo,
                    CompanyType = CommunicationAdd.CompanyType,
                    From = (DateTime)CommunicationAdd.From,
                    To = (DateTime)CommunicationAdd.To,
                    CompanyModeid = (int)CommunicationAdd.ComModeTypeId,
                    Subject = CommunicationAdd.Subject,
                    Description = CommunicationAdd.Description,
                    Inward = CommunicationAdd.Inward,
                    Remarks = CommunicationAdd.Remarks,
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<bool> UpdateCommunication(Domain.Communication CommunicationUpd)
        {
            //if (string.IsNullOrEmpty(CityUpd.CityName)) return new Response<bool>(false, Status.ERROR, "Given CountryName of Country is empty");
            //if (isNameAvailableAlready(CityUpd, "UPDATE")) return new Response<bool>(false, Status.ERROR, "Given mode of shipment is already available");

            return new Response<bool>(CommRepo.UpdateData(new Repository.Communication
            {
                Id=CommunicationUpd.CommunicationId,
                Companyid = CommunicationUpd.CompanyId,
                Buyerid = (int)CommunicationUpd.BuyerId,
                Supplierid = (int)CommunicationUpd.SupplierId,
                Agentid = (int)CommunicationUpd.AgentId,
                Others = CommunicationUpd.Others,
                EntryNo = CommunicationUpd.EntryNo,
                EntryDate = CommunicationUpd.EntryDate,
                RefNo = CommunicationUpd.RefNo,
                RefDate = CommunicationUpd.RefDate,
                EnquiryNo = CommunicationUpd.EnquiryNo,
                OrderNo = CommunicationUpd.OrderNo,
                OrderRefNo = CommunicationUpd.OrderRefNo,
                MiscRefNo = CommunicationUpd.MiscRefNo,
                CompanyType = CommunicationUpd.CompanyType,
                From = CommunicationUpd.From,
                To = CommunicationUpd.To,
                CompanyModeid = (int)CommunicationUpd.ComModeTypeId,
                Subject = CommunicationUpd.Subject,
                Description = CommunicationUpd.Description,
                Inward = CommunicationUpd.Inward,
                Remarks = CommunicationUpd.Remarks,
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Common.Response<bool> DeleteCommunication(int CommunicationId)
        {
            return new Response<bool>(CommRepo.DeleteData(CommunicationId), Status.SUCCESS, "Deleted Successfully");
        }
    }
}
