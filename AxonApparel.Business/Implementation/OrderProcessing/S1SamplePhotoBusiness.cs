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
    public class S1SamplePhotoBusiness:IS1SamplePhotoBusiness
    {
        S1SamplePhotoRepository obj = new S1SamplePhotoRepository();

        public Response<IQueryable<Domain.S1SamplePhoto>> GetData()
        {
            try
            {
                var couList = obj.GetDataList();
                return new Response<IQueryable<Domain.S1SamplePhoto>>(couList.Select(m => new Domain.S1SamplePhoto
                {
                    S1EntryId=m.S1EntryId,
                    RefNo = m.Buy_Ord_Mas.Ref_No,
                    FabIH = m.FabIH,
                    Remarks = m.Remarks,
                    ElasticIH = m.ElasticIH,
                    Buy_Ord_MasId = m.Buy_Ord_MasId,
                    IsActive = m.IsActive ? "Active" : "In-Active",
                    ProtoSew = m.ProtoSew,
                    ProtoSubmit = m.ProtoSubmit,
                    WearTrial = m.WearTrial

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.S1SamplePhoto>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> Create(Domain.S1SamplePhoto ObjAdd)
        {
            try
            {
                return new Response<int>(obj.AddData(new Repository.S1SamplePhotoEntry
                {                    
                    Buy_Ord_MasId = ObjAdd.Buy_Ord_MasId,
                    FabIH = ObjAdd.FabIH,
                    ElasticIH = ObjAdd.ElasticIH,
                    ProtoSew = ObjAdd.ProtoSew,
                    ProtoSubmit = ObjAdd.ProtoSubmit,
                    FitSubmit = ObjAdd.FitSubmit,
                    WearTrial = ObjAdd.WearTrial,                   
                    Remarks = ObjAdd.Remarks,                    
                    IsActive = ObjAdd.IsActive.ToUpper() == "TRUE"
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.S1SamplePhoto> GetId(int Id)
        {
            try
            {
                var cou = obj.GetDataById(Id);
                return new Response<Domain.S1SamplePhoto>(new Domain.S1SamplePhoto
                {
                    S1EntryId=cou.S1EntryId,
                    Buy_Ord_MasId = cou.Buy_Ord_MasId,
                    FabIH = cou.FabIH,
                    ElasticIH = cou.ElasticIH,
                    ProtoSew = cou.ProtoSew,
                    ProtoSubmit = cou.ProtoSubmit,
                    FitSubmit = cou.FitSubmit,
                    WearTrial = cou.WearTrial,                   
                    Remarks = cou.Remarks,
                    IsActive = cou.IsActive ? "TRUE" : "FALSE",
                    
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.S1SamplePhoto>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> Update(Domain.S1SamplePhoto Upd)
        {
            try
            {
                return new Response<bool>(obj.UpdateData(new Repository.S1SamplePhotoEntry
                {
                    S1EntryId=Upd.S1EntryId,
                    Buy_Ord_MasId = Upd.Buy_Ord_MasId,
                    FabIH = Upd.FabIH,
                    ElasticIH = Upd.ElasticIH,
                    ProtoSew = Upd.ProtoSew,
                    ProtoSubmit = Upd.ProtoSubmit,
                    FitSubmit = Upd.FitSubmit,
                    WearTrial = Upd.WearTrial,
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

        public Response<IList<Domain.S1SamplePhoto>> GetS1Entry()
        {
            try
            {
                var CurDetList = obj.GetS1Entry();

                return new Response<IList<Domain.S1SamplePhoto>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Domain.S1SamplePhoto>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
