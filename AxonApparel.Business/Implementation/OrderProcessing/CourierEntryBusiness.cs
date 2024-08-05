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
    public class CourierEntryBusiness : ICourierEntryBusiness
    {

        ICourierEntryRepository curiRep = new CourierEntryRepository();



        public Response<IQueryable<CourierEntryList>> GetCourierEntry(int? companyId, string EntryNo, string fromDate, string toDate, int? DespLocationId, string DespType)
        {
            try
            {
                var CurList = curiRep.GetDataList(companyId, EntryNo, fromDate, toDate, DespLocationId, DespType);
                
                return new Response<IQueryable<CourierEntryList>>(CurList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {                
                return new Response<IQueryable<CourierEntryList>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<CourierEntryList>> GetCourierDetDetails(int Courier_MasId)
        {
            try
            {
                var CurDetList = curiRep.GetDataDetList(Courier_MasId);

                return new Response<IQueryable<CourierEntryList>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<CourierEntryList>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<CourierEntry> GetDataById(int Courier_MasId)
        {
            try
            {
                var buo = curiRep.GetDataById(Courier_MasId);
                return new Response<Domain.CourierEntry>(new Domain.CourierEntry
                {
                    Courier_MasId=buo.Courier_MasId,
                    EntryNo=buo.EntryNo,
                    EntryDate=(DateTime)buo.EntryDate,
                    Ref_No=buo.Ref_No,
                    AWBNo=buo.AWBNo,
                    AWBDate=(DateTime)buo.AWBDate,
                    ContactPerson=buo.ContactPerson,
                    CompanyId=(int)buo.CompanyId,
                    DespLocationId = (int)buo.DespLocationId,
                    CourierId=(int)buo.CourierId,
                    DespType=buo.DespType,
                    InOrOut=buo.InOrOut,
                    ReturnStatus=(bool)buo.ReturnStatus
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.CourierEntry>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateCourierEntry(CourierEntry CEnty)
        {
            try
            {
                var CourierMasterId = curiRep.AddData(new AxonApparel.Repository.Courier_Mas
                {
                    Courier_MasId = CEnty.Courier_MasId,
                    CompanyId = CEnty.CompanyId,
                    EntryNo = CEnty.EntryNo,
                    EntryDate = CEnty.EntryDate,
                    Ref_No = CEnty.Ref_No,
                    CourierId = CEnty.CourierId,
                    DespType = CEnty.DespType,
                    DespLocationId = CEnty.DespLocationId,
                    AWBNo = CEnty.AWBNo,
                    AWBDate = CEnty.AWBDate,
                    ContactPerson = CEnty.ContactPerson,
                    InOrOut = CEnty.InOrOut,
                    ReturnStatus = CEnty.ReturnStatus
                });

                var detailList = new List<Courier_Det>();

                foreach (var item in CEnty.CourierItem)
                {
                    detailList.Add(new Courier_Det
                    {
                        Courier_MasId = CourierMasterId,
                        ItemId = item.ItemId,
                        ColorId = item.ColorId,
                        SizeId = item.SizeId,
                        UomId = item.UomId,
                        Quantity = item.Quantity,
                    });
                }
                var result = curiRep.AddDetData(detailList);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        
        public Response<bool> UpdateCourierEntry(CourierEntry CEnty)
        
        {
            try
            {
                var CourierMasterId = curiRep.UpdateData(new AxonApparel.Repository.Courier_Mas
                {
                    Courier_MasId = CEnty.Courier_MasId,
                    CompanyId = CEnty.CompanyId,
                    EntryNo = CEnty.EntryNo,
                    EntryDate = CEnty.EntryDate,
                    Ref_No = CEnty.Ref_No,
                    CourierId = CEnty.CourierId,
                    DespType = CEnty.DespType,
                    DespLocationId = CEnty.DespLocationId,
                    AWBNo = CEnty.AWBNo,
                    AWBDate = CEnty.AWBDate,
                    ContactPerson = CEnty.ContactPerson,
                    InOrOut=CEnty.InOrOut,
                    ReturnStatus = CEnty.ReturnStatus,

                });

                var detailList = new List<Courier_Det>();

                foreach (var item in CEnty.CourierItem)
                {
                    detailList.Add(new Courier_Det
                    {
                       
                        ItemId = item.ItemId,
                        ColorId = item.ColorId,
                        SizeId = item.SizeId,
                        UomId = item.UomId,
                        Quantity = item.Quantity,
                        Courier_DetId=item.Courier_DetId,
                    });
                }
                var result = curiRep.UpdateDetData(detailList);


                //cour Add in Update Case 


                var detailListEdit = new List<Courier_Det>();
                if (CEnty.CourierItem.Count > 0)
                {

                    foreach (var CItem in CEnty.CourierItem)
                    {
                        if (CItem.Courier_DetId == 0)
                        {

                            detailListEdit.Add(new Courier_Det
                            {
                                ItemId = CItem.ItemId,
                                ColorId = CItem.ColorId,
                                SizeId = CItem.SizeId,
                                UomId = CItem.UomId,
                                Quantity = CItem.Quantity,
                                Courier_DetId = CItem.Courier_DetId,
                                Courier_MasId = CEnty.Courier_MasId,
                            });
                        }
                    }

                }

                var result9 = curiRep.AddDetData(detailListEdit);

                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }

                       
        }

        public Response<bool> DeleteCourierEntry(int Courier_MasId)
        {
            return new Response<bool>(curiRep.DeleteData(Courier_MasId), Status.SUCCESS, "Deleted Successfully");
        }




        public Response<IQueryable<CourierEntry>> GetEntryNoList()
        {
            try
            {
                var OrdList = curiRep.GetEntryNoDataList();
                return new Response<IQueryable<CourierEntry>>(OrdList.Select(m => new CourierEntry
                {
                    Courier_MasId = m.Courier_MasId,
                    EntryNo = m.EntryNo
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<CourierEntry>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

     
    }
}
