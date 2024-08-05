using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public class P1EntryBusiness:IP1EntryBusiness
    {
        IP1EntryRepository obj = new P1EntryRepository();



        public Response<IQueryable<Domain.BuyOrderStyle>> GetDescription(int id)
        {

            try
            {
                var CurDetList = obj.GetDescription(id);

                return new Response<IQueryable<BuyOrderStyle>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.BuyOrderStyle>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }





        public Response<int> Create(Domain.P1Entry ObjAdd)
        {
            try
            {
               

                return new Response<int>(obj.AddData(new Repository.P1Entry
                {
                   
                    P1EntryId=ObjAdd.P1EntryId,
                    Buy_Ord_MasId=ObjAdd.Buy_Ord_MasId,
                    Description=ObjAdd.Description,
                    Remarks=ObjAdd.Remarks,
                    EntryDate=ObjAdd.EntryDate,
                    IsActive = ObjAdd.IsActive.ToUpper() == "TRUE"
                   
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.P1Entry>> GetData()
        {
            try
            {
                var couList = obj.GetDataList();
                return new Response<IQueryable<Domain.P1Entry>>(couList.Select(m => new Domain.P1Entry
                {
                   RefNo=m.Buy_Ord_Mas.Ref_No,
                   Description=m.Description,
                   Remarks=m.Remarks,
                   P1EntryId=m.P1EntryId,
                   Buy_Ord_MasId=m.Buy_Ord_MasId,
                   IsActive = m.IsActive ? "TRUE" : "FALSE",
                   EntryDate=(DateTime)m.EntryDate

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.P1Entry>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<Domain.P1Entry> GetId(int Id)
        {
            try
            {
                var cou = obj.GetDataById(Id);
                return new Response<Domain.P1Entry>(new Domain.P1Entry
                {
                    P1EntryId = cou.P1EntryId,
                    Buy_Ord_MasId = cou.Buy_Ord_MasId,
                    Description = cou.Description,
                    Remarks = cou.Remarks,
                    RefNo=cou.Buy_Ord_Mas.Ref_No,
                    IsActive = cou.IsActive ? "TRUE" : "FALSE",
                    EntryDate=(DateTime)cou.EntryDate
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.P1Entry>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> Update(Domain.P1Entry Upd)
        {
            try
            {


                return new Response<bool>(obj.UpdateData(new Repository.P1Entry
                {

                    P1EntryId = Upd.P1EntryId,
                    Buy_Ord_MasId = Upd.Buy_Ord_MasId,
                    Description = Upd.Description,
                    Remarks = Upd.Remarks,
                    EntryDate=Upd.EntryDate,
                    IsActive = Upd.IsActive.ToUpper() == "TRUE"

                }), Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> Delete(int Id)
        {
            return new Response<bool>(obj.DeleteData(Id), Status.SUCCESS, "Deleted Successfully");
        }


        public Response<IList<Domain.P1Entry>> GetP1Entry()
        {
            try
            {
                var CurDetList = obj.GetP1Entry();

                return new Response<IList<Domain.P1Entry>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Domain.P1Entry>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
