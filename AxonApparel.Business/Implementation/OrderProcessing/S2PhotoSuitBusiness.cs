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
    public class S2PhotoSuitBusiness : IS2PhotoSuitBusiness
    {
        IS2PhotoSuitRepository obj = new S2PhotoSuitRepository();

        public Response<IQueryable<Domain.S2PhotoSuit>> GetData()
        {
            try
            {
                var couList = obj.GetDataList();
                return new Response<IQueryable<Domain.S2PhotoSuit>>(couList.Select(m => new Domain.S2PhotoSuit
                {
                    S2EntryId = m.S2EntryId, 
                    RefNo = m.Buy_Ord_Mas.Ref_No,
                    Fabric = m.Fabric,
                    Remarks = m.Remarks,
                    Elastic = m.Elastic,
                    Buy_Ord_MasId = m.Buy_Ord_MasId,
                    IsActive = m.IsActive ? "Active" : "In-Active",
                    PhotoSuitSmpleSew = m.PhotoSuitSmpleSew,
                    PhotoSuitSmpleSubmit = m.PhotoSuitSmpleSubmit,
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.S2PhotoSuit>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> Create(Domain.S2PhotoSuit ObjAdd)
        {
            try
            {
                return new Response<int>(obj.AddData(new Repository.S2PhotoSuit
                {
                    Buy_Ord_MasId = ObjAdd.Buy_Ord_MasId,
                    Fabric = ObjAdd.Fabric,
                    Elastic = ObjAdd.Elastic,
                    PhotoSuitSmpleSew = ObjAdd.PhotoSuitSmpleSew,
                    PhotoSuitSmpleSubmit = ObjAdd.PhotoSuitSmpleSubmit,                    
                    Remarks = ObjAdd.Remarks,
                    IsActive = ObjAdd.IsActive.ToUpper() == "TRUE"
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.S2PhotoSuit> GetId(int Id)
        {
            try
            {
                var cou = obj.GetDataById(Id);
                return new Response<Domain.S2PhotoSuit>(new Domain.S2PhotoSuit
                {
                    S2EntryId = cou.S2EntryId,
                    Buy_Ord_MasId = cou.Buy_Ord_MasId,
                    Fabric = cou.Fabric,
                    Elastic = cou.Elastic,
                    PhotoSuitSmpleSew = cou.PhotoSuitSmpleSew,
                    PhotoSuitSmpleSubmit = cou.PhotoSuitSmpleSubmit,                    
                    Remarks = cou.Remarks,
                    IsActive = cou.IsActive ? "TRUE" : "FALSE",

                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.S2PhotoSuit>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> Update(Domain.S2PhotoSuit Upd)
        {
            try
            {
                return new Response<bool>(obj.UpdateData(new Repository.S2PhotoSuit
                {
                    S2EntryId = Upd.S2EntryId,
                    Buy_Ord_MasId = Upd.Buy_Ord_MasId,
                    Fabric = Upd.Fabric,
                    Elastic = Upd.Elastic,
                    PhotoSuitSmpleSew = Upd.PhotoSuitSmpleSew,
                    PhotoSuitSmpleSubmit = Upd.PhotoSuitSmpleSubmit,                    
                    Remarks = Upd.Remarks,
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

        public Response<IList<Domain.S2PhotoSuit>> GetS2Entry()
        {
            try
            {
                var CurDetList = obj.GetS2Entry();

                return new Response<IList<Domain.S2PhotoSuit>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Domain.S2PhotoSuit>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

    }
}
