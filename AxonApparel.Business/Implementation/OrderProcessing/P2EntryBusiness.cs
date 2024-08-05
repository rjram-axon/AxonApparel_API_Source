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
    public class P2EntryBusiness:IP2EntryBusiness
    {
        IP2EntryRepository obj = new P2EntryRepository();

        public Response<int> Create(Domain.P2Entry ObjAdd)
        {
            try
            {


                return new Response<int>(obj.AddData(new Repository.P2Entry
                {

                    P2EntryId = ObjAdd.P2EntryId,
                    Buy_Ord_MasId = ObjAdd.Buy_Ord_MasId,
                    Description = ObjAdd.Description,
                    Remarks = ObjAdd.Remarks,
                    P1Date = ObjAdd.P1Date,
                    P2Date=ObjAdd.P2Date,
                    IsActive = ObjAdd.IsActive.ToUpper() == "TRUE"

                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.P2Entry>> GetData()
        {
            try
            {
                var couList = obj.GetDataList();
                return new Response<IQueryable<Domain.P2Entry>>(couList.Select(m => new Domain.P2Entry
                {
                    RefNo = m.Buy_Ord_Mas.Ref_No,
                    Description = m.Description,
                    Remarks = m.Remarks,
                    P2EntryId = m.P2EntryId,
                    Buy_Ord_MasId = m.Buy_Ord_MasId,
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    P1Date = (DateTime)m.P1Date,
                    P2Date = (DateTime)m.P2Date

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.P2Entry>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.P2Entry> GetId(int Id)
        {
            try
            {
                var cou = obj.GetDataById(Id);
                return new Response<Domain.P2Entry>(new Domain.P2Entry
                {
                    P2EntryId = cou.P2EntryId,
                    Buy_Ord_MasId = cou.Buy_Ord_MasId,
                    Description = cou.Description,
                    Remarks = cou.Remarks,
                    RefNo = cou.Buy_Ord_Mas.Ref_No,
                    P1Date = (DateTime)cou.P1Date,
                    P2Date = (DateTime)cou.P2Date
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.P2Entry>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> Update(Domain.P2Entry Upd)
        {
            try
            {


                return new Response<bool>(obj.UpdateData(new Repository.P2Entry
                {

                    P2EntryId = Upd.P2EntryId,
                    Buy_Ord_MasId = Upd.Buy_Ord_MasId,
                    Description = Upd.Description,
                    Remarks = Upd.Remarks,
                    P1Date = Upd.P1Date,
                    P2Date=Upd.P2Date,
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


        public Response<IList<Domain.P2Entry>> GetP2Entry()
        {
            try
            {
                var CurDetList = obj.GetP2Entry();

                return new Response<IList<Domain.P2Entry>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Domain.P2Entry>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
