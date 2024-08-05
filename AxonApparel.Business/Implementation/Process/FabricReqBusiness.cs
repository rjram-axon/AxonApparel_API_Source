using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public class FabricReqBusiness : IFabricReqBusiness
    {
        IFabricReqRepository repo = new FabricReqRepository();

        public Response<IQueryable<Domain.FabricDet>> LoadItemDet(int Bmasid, int Styleid)
        {
            try
            {
                var ProductWO = repo.LoadItemDet(Bmasid, Styleid);

                return new Response<IQueryable<Domain.FabricDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.FabricDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateUnitEntry(Domain.FabricMas MasEntry)
        {
            try
            {


                //var ID = repo.AddData(new AxonApparel.Repository.Process_Recpt_Mas
                AxonApparel.Repository.Fabric_Requisition_Mas ProcInsert = new AxonApparel.Repository.Fabric_Requisition_Mas

                {
                    Fabric_Req_Masid = MasEntry.Fabric_Req_Masid,
                    Fabric_Req_date = MasEntry.Fabric_Req_date,
                    Fabric_Req_no = MasEntry.Fabric_Req_no,
                    Buy_Ord_Masid = MasEntry.Buy_Ord_Masid,
                    DeliScheduleNo = MasEntry.DeliScheduleNo,
                    IntenalOrExternal = MasEntry.IntenalOrExternal,
                    PendingQty = MasEntry.PendingQty,
                    PlannedQty = MasEntry.PlannedQty,
                    ProcessorId = MasEntry.ProcessorId,
                    CompanyId = MasEntry.companyid,
                    OType = MasEntry.Otype,
                    CreatedBy = MasEntry.CreatedBy,
                    StyleId=MasEntry.styleid,
                    //Process_Recpt_Return = ItmList

                };

                var ItmList = new List<Fabric_Requisition_Det>();

                if (MasEntry.FabDet != null)
                {
                    foreach (var PItem in MasEntry.FabDet)
                    {
                        ItmList.Add(new Fabric_Requisition_Det
                        {

                            Itemid = PItem.Itemid,
                            Colorid = PItem.Colorid,
                            Sizeid = PItem.Sizeid,
                            Fabric_Req_Masid = PItem.Fabric_Req_Masid,
                            Fabric_Req_detid = PItem.Fabric_Req_detid,
                            FabricWt = PItem.FabricWt,
                            LotNo = PItem.LotNo,
                            BatchNo = PItem.BatchNo,
                            ReqWt = PItem.ReqWt,
                            Uomid = PItem.Uomid,
                            AvailStock = PItem.AvailStock,
                            ComboColorid = PItem.ComboColorid,
                            IsChecked = PItem.check,
                        });
                    }

                }


                var result = repo.Add(ProcInsert, ItmList, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }


        public Response<IQueryable<Domain.FabricMas>> LoadMaingrid(int? bmasid, int? styleid, int? fabid, string processortype, string fromdate, string todate, string Otype, int ProcessorId)
        {
            try
            {
                var ProductWO = repo.LoadMaingrid(bmasid, styleid, fabid, processortype, fromdate, todate, Otype, ProcessorId);

                return new Response<IQueryable<Domain.FabricMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.FabricMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.FabricDet>> LoadEditItemDet(int Masid)
        {
            try
            {
                var ProductWO = repo.LoadEditItemDet(Masid);

                return new Response<IQueryable<Domain.FabricDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.FabricDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateEntry(Domain.FabricMas MasEntry)
        {
            try
            {


                //var ID = repo.AddData(new AxonApparel.Repository.Process_Recpt_Mas
                AxonApparel.Repository.Fabric_Requisition_Mas ProcInsert = new AxonApparel.Repository.Fabric_Requisition_Mas

                {
                    Fabric_Req_Masid = MasEntry.Fabric_Req_Masid,
                    Fabric_Req_date = MasEntry.Fabric_Req_date,
                    Fabric_Req_no = MasEntry.Fabric_Req_no,
                    Buy_Ord_Masid = MasEntry.Buy_Ord_Masid,
                    DeliScheduleNo = MasEntry.DeliScheduleNo,
                    IntenalOrExternal = MasEntry.IntenalOrExternal,
                    PendingQty = MasEntry.PendingQty,
                    PlannedQty = MasEntry.PlannedQty,
                    ProcessorId = MasEntry.ProcessorId,
                    CompanyId = MasEntry.companyid,
                    OType = MasEntry.Otype,
                    CreatedBy = MasEntry.CreatedBy,
                    StyleId = MasEntry.styleid,
                    //Process_Recpt_Return = ItmList

                };

                var ItmList = new List<Fabric_Requisition_Det>();

                if (MasEntry.FabDet != null)
                {
                    foreach (var PItem in MasEntry.FabDet)
                    {
                        ItmList.Add(new Fabric_Requisition_Det
                        {

                            Itemid = PItem.Itemid,
                            Colorid = PItem.Colorid,
                            Sizeid = PItem.Sizeid,
                            Fabric_Req_Masid = PItem.Fabric_Req_Masid,
                            Fabric_Req_detid = PItem.Fabric_Req_detid,
                            FabricWt = PItem.FabricWt,
                            LotNo = PItem.LotNo,
                            BatchNo = PItem.BatchNo,
                            ReqWt = PItem.ReqWt,
                            Uomid = PItem.Uomid,
                            AvailStock = PItem.AvailStock,
                            ComboColorid = PItem.ComboColorid,
                            IsChecked = PItem.check,
                        });
                    }

                }


                var result = repo.Update(ProcInsert, ItmList, "Upd");

                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }


        public Response<bool> DeleteEntry(Domain.FabricMas MasEntry)
        {
            try
            {


                //var ID = repo.AddData(new AxonApparel.Repository.Process_Recpt_Mas
                AxonApparel.Repository.Fabric_Requisition_Mas ProcInsert = new AxonApparel.Repository.Fabric_Requisition_Mas

                {
                    Fabric_Req_Masid = MasEntry.Fabric_Req_Masid,
                    Fabric_Req_date = MasEntry.Fabric_Req_date,
                    Fabric_Req_no = MasEntry.Fabric_Req_no,
                    Buy_Ord_Masid = MasEntry.Buy_Ord_Masid,
                    DeliScheduleNo = MasEntry.DeliScheduleNo,
                    IntenalOrExternal = MasEntry.IntenalOrExternal,
                    PendingQty = MasEntry.PendingQty,
                    PlannedQty = MasEntry.PlannedQty,
                    ProcessorId = MasEntry.ProcessorId,
                    CreatedBy = MasEntry.CreatedBy,
                    StyleId = MasEntry.styleid,
                    //Process_Recpt_Return = ItmList

                };

                var ItmList = new List<Fabric_Requisition_Det>();

                if (MasEntry.FabDet != null)
                {
                    foreach (var PItem in MasEntry.FabDet)
                    {
                        ItmList.Add(new Fabric_Requisition_Det
                        {

                            Itemid = PItem.Itemid,
                            Colorid = PItem.Colorid,
                            Sizeid = PItem.Sizeid,
                            Fabric_Req_Masid = PItem.Fabric_Req_Masid,
                            Fabric_Req_detid = PItem.Fabric_Req_detid,
                            FabricWt = PItem.FabricWt,
                            LotNo = PItem.LotNo,
                            BatchNo = PItem.BatchNo,
                            ReqWt = PItem.ReqWt,
                            Uomid = PItem.Uomid,
                            AvailStock = PItem.AvailStock,
                            ComboColorid = PItem.ComboColorid
                        });
                    }

                }


                var result = repo.Delete(ProcInsert, ItmList, "Delete");

                return new Response<bool>(result, Status.SUCCESS, "Deleted Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }
    }
}
