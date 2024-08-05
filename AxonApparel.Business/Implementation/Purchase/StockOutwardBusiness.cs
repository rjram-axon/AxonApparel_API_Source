using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public class StockOutwardBusiness : IStockOutwardBusiness
    {
        IStockOutwardRepository repo = new StockOutwardRepository();

        public Common.Response<IQueryable<Domain.GenIssueDet>> GetUom(int itmid)
        {
            try
            {
                var ProductWO = repo.GetUom(itmid);

                return new Response<IQueryable<Domain.GenIssueDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.GenIssueDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Common.Response<IQueryable<Domain.GenIssueDet>> GetItem(int ItemGroupId)
        {
            try
            {
                var ProductWO = repo.GetItem(ItemGroupId);

                return new Response<IQueryable<Domain.GenIssueDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
            }
            catch
            {
                return new Response<IQueryable<Domain.GenIssueDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Common.Response<IQueryable<Domain.GenIssueDet>> GetPurUom(int itmid)
        {
            try
            {
                var ProductWO = repo.GetPurUom(itmid);

                return new Response<IQueryable<Domain.GenIssueDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.GenIssueDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.GenIssueStock>> GetStkDet(string type, int cmpid, int itmid, int colorid, int sizeid, int uomid, int issueid, int procid, int stunitid, string itmcat, string ordno, int FabReqId,string Orderno,int Styleid)
        {
            try
            {
                var ProductWO = repo.GetStkDet(type, cmpid, itmid, colorid, sizeid, uomid, issueid, procid, stunitid, itmcat, ordno, FabReqId, Orderno, Styleid);

                return new Response<IQueryable<Domain.GenIssueStock>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.GenIssueStock>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateUnitEntry(Domain.GenIssueMas GrnEntry)
        {

            int? Proid = 0;
            int? reqid = 0;
            int? strid = 0;
            int? cretdby = 0;
            string veh = "";
            if (GrnEntry.Processid == 0)
            {
                Proid = null;
            }
            else
            {
                Proid = GrnEntry.Processid;
            }
            if (GrnEntry.RequestnerId == 0)
            {
                reqid = null;
            }
            else
            {
                reqid = GrnEntry.RequestnerId;
            }
            if (GrnEntry.storeunitid == 0)
            {
                strid = null;
            }
            else
            {
                strid = GrnEntry.storeunitid;
            }
            if (GrnEntry.CreatedBy == 0)
            {
                cretdby = null;
            }
            else
            {
                cretdby = GrnEntry.CreatedBy;
            }
            if (GrnEntry.VehicleNo == null)
            {
                veh = "";
            }
            else
            {
                veh = GrnEntry.VehicleNo;
            }
            try
            {
                //var ID = repo.AddData(new AxonApparel.Repository.GenIssueMas
                AxonApparel.Repository.GenIssueMas GrnordInsert = new AxonApparel.Repository.GenIssueMas
               {
                   IssueId = GrnEntry.IssueId,
                   IssueDate = GrnEntry.IssueDate,
                   IssueNo = GrnEntry.IssueNo,
                   CompanyID = GrnEntry.CompanyID,
                   UnitType = GrnEntry.UnitType,
                   UnitId = GrnEntry.UnitId,
                   InvoiceType = GrnEntry.InvoiceType,
                   Remarks = GrnEntry.Remarks,
                   GrossAmount = GrnEntry.GrossAmount,
                   NetAmount = GrnEntry.NetAmount,
                   IssueOrRecpt = GrnEntry.IssueOrRecpt,
                   RequestnerId = reqid,//GrnEntry.RequestnerId,
                   Processid = Proid,//GrnEntry.Processid,
                   VehicleNo = veh,
                   storeunitid = strid,//GrnEntry.storeunitid,
                   CreatedBy = cretdby,//GrnEntry.CreatedBy,
                   ToDiviid = GrnEntry.ToDiviid,
                   ReqNo = GrnEntry.ReqMasNo,


               };

                var ItmList = new List<GenIssueDet>();

                foreach (var PItem in GrnEntry.GenDet)
                {
                    ItmList.Add(new GenIssueDet
                    {
                        IssueDetId = PItem.IssueDetId,
                        IssueID = PItem.IssueID,//PItem.Unit_GRN_Masid,
                        ItemID = PItem.ItemID,
                        ColorID = PItem.ColorID,
                        SizeID = PItem.SizeID,
                        Quantity = PItem.Quantity,
                        Uomid = PItem.Uomid,
                        Rate = PItem.Rate,
                        sQty = PItem.sQty,
                        sUomId = PItem.sUomId


                    });

                }

                var ItmstkList = new List<GenIssueStock>();

                foreach (var stk in GrnEntry.GenStkDet)
                {
                    ItmstkList.Add(new GenIssueStock
                    {
                        IssueId = stk.IssueId,
                        GenIssueStockId = stk.GenIssueStockId,
                        IssueDetid = stk.IssueDetid,
                        Stockid = stk.Stockid,
                        Quantity = stk.IssStkQty,
                        Uomid = stk.Uomid

                    });

                }

                var AddlessList = new List<GenIssueAddless>();

                if (GrnEntry.GenAdLsDet != null)
                {
                    foreach (var addless in GrnEntry.GenAdLsDet)
                    {
                        AddlessList.Add(new GenIssueAddless
                        {
                            IssueId = addless.IssueId,
                            GenIssueAddlessId = addless.GenIssueAddlessId,
                            AddlessID = addless.Addlessid,
                            Amount = addless.Amount,
                            AddorLess = addless.PlusOrMinus,
                            Percentage = addless.Percentage

                        });

                    }
                }

                var result = repo.AddDetData(GrnordInsert, ItmList, ItmstkList, AddlessList, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");

            }
        }




        public Response<bool> Update(Domain.GenIssueMas obj)
        {

            int? Proid = 0;
            int? reqid = 0;
            int? strid = 0;
            int? cretdby = 0;
            string veh = "";
            if (obj.Processid == 0)
            {
                Proid = null;
            }
            else
            {
                Proid = obj.Processid;
            }
            if (obj.RequestnerId == 0)
            {
                reqid = null;
            }
            else
            {
                reqid = obj.RequestnerId;
            }
            if (obj.storeunitid == 0)
            {
                strid = null;
            }
            else
            {
                strid = obj.storeunitid;
            }
            if (obj.CreatedBy == 0)
            {
                cretdby = null;
            }
            else
            {
                cretdby = obj.CreatedBy;
            }
            if (obj.VehicleNo == null)
            {
                veh = "";
            }
            else
            {
                veh = obj.VehicleNo;
            }
            try
            {

                AxonApparel.Repository.GenIssueMas GrnordUpd = new AxonApparel.Repository.GenIssueMas

                //var ID = repo.UpdateData(new AxonApparel.Repository.GenIssueMas
                {
                    IssueId = obj.IssueId,
                    IssueDate = obj.IssueDate,
                    IssueNo = obj.IssueNo,
                    CompanyID = obj.CompanyID,
                    UnitType = obj.UnitType,
                    UnitId = obj.UnitId,
                    InvoiceType = obj.InvoiceType,
                    Remarks = obj.Remarks,
                    GrossAmount = obj.GrossAmount,
                    NetAmount = obj.NetAmount,
                    IssueOrRecpt = obj.IssueOrRecpt,
                    RequestnerId = reqid,//obj.RequestnerId,
                    Processid = Proid,//obj.Processid,
                    VehicleNo = veh,
                    storeunitid = strid,// obj.storeunitid,
                    CreatedBy = cretdby,// obj.CreatedBy,
                    ToDiviid = obj.ToDiviid,
                    ReqNo = obj.ReqMasNo,



                };

                var ItmList = new List<GenIssueDet>();

                foreach (var PItem in obj.GenDet)
                {
                    ItmList.Add(new GenIssueDet
                    {
                        IssueDetId = PItem.IssueDetId,
                        IssueID = PItem.IssueID,
                        ItemID = PItem.ItemID,
                        ColorID = PItem.ColorID,
                        SizeID = PItem.SizeID,
                        Quantity = PItem.Quantity,
                        Uomid = PItem.Uomid,
                        Rate = PItem.Rate,
                        sQty = PItem.sQty,
                        sUomId = PItem.sUomId


                    });

                }

                var ItmstkList = new List<GenIssueStock>();

                foreach (var stk in obj.GenStkDet)
                {
                    ItmstkList.Add(new GenIssueStock
                    {
                        IssueId = stk.IssueId,
                        GenIssueStockId = stk.GenIssueStockId,
                        IssueDetid = stk.IssueDetid,
                        Stockid = stk.Stockid,
                        Quantity = stk.IssStkQty,
                        Uomid = stk.Uomid

                    });

                }

                var AddlessList = new List<GenIssueAddless>();
                if (obj.GenAdLsDet != null)
                {
                    foreach (var addless in obj.GenAdLsDet)
                    {
                        AddlessList.Add(new GenIssueAddless
                        {
                            IssueId = addless.IssueId,
                            GenIssueAddlessId = addless.GenIssueAddlessId,
                            AddlessID = addless.Addlessid,
                            Amount = addless.Amount,
                            AddorLess = addless.PlusOrMinus,
                            Percentage = addless.Percentage

                        });

                    }
                }
                var result = repo.UpdDetData(GrnordUpd, ItmList, ItmstkList, AddlessList, "Update");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");

            }
        }


        public Response<IQueryable<Domain.GenIssueMas>> GetDataMainList(string ivtype, int? issueid, string issueno, int? cmpnyid, string unittype, int? unitid, int? suppid, int? procid, string fromDate, string todate)
        {
            try
            {
                var ProductWO = repo.GetDataMainList(ivtype, issueid, issueno, cmpnyid, unittype, unitid, suppid, procid, fromDate, todate);

                return new Response<IQueryable<Domain.GenIssueMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.GenIssueMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> Delete(Domain.GenIssueMas objDet)
        {

            try
            {

                AxonApparel.Repository.GenIssueMas GrnordDetd = new AxonApparel.Repository.GenIssueMas

                //var ID = repo.UpdateData(new AxonApparel.Repository.GenIssueMas
                {
                    IssueId = objDet.IssueId,
                    ReqNo = objDet.ReqMasNo,
                    IssueNo = objDet.IssueNo,
                };



                var ItmstkList = new List<GenIssueStock>();

                foreach (var stk in objDet.GenStkDet)
                {
                    ItmstkList.Add(new GenIssueStock
                    {
                        IssueId = stk.IssueId,
                        GenIssueStockId = stk.GenIssueStockId,
                        IssueDetid = stk.IssueDetid,
                        Stockid = stk.Stockid,
                        Quantity = stk.IssStkQty,
                        Uomid = stk.Uomid

                    });

                }

                var result = repo.DeleteData(GrnordDetd, ItmstkList);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");

            }
        }


        public Response<IQueryable<Domain.GenIssueMas>> GetDataheaderdet(string ivtype, int? issueid, string issueno, int? cmpnyid, string unittype, int? unitid, int? suppid, int? procid, string fromDate, string todate)
        {
            try
            {
                var ProductWO = repo.GetDataheaderdet(ivtype, issueid, issueno, cmpnyid, unittype, unitid, suppid, procid, fromDate, todate);

                return new Response<IQueryable<Domain.GenIssueMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.GenIssueMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.GenIssueDet>> GetItmeditDet(string type, int cmpid, int itmid, int colorid, int sizeid, int uomid, int issueid, int procid, int stunitid, string itmcat, string ordno)
        {
            try
            {
                var ProductWO = repo.GetItmeditDet(type, cmpid, itmid, colorid, sizeid, uomid, issueid, procid, stunitid, itmcat, ordno);

                return new Response<IQueryable<Domain.GenIssueDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.GenIssueDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<Domain.GenIssueAddless>> ListGetEditAddlessDetails(int Id)
        {
            try
            {
                var ProductWO = repo.GetStkoutEditAccLoad(Id);

                return new Response<IList<Domain.GenIssueAddless>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.GenIssueAddless>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.GenIssueDet>> loadItmReqDet(int ReqMasId)
        {
            try
            {
                var ProductWO = repo.RepItmReqDet(ReqMasId);

                return new Response<IQueryable<Domain.GenIssueDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.GenIssueDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.GenIssueMas>> GetDataReqNoList()
        {
            try
            {
                var ProductWO = repo.GetDataRepReqNoList();

                return new Response<IQueryable<Domain.GenIssueMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.GenIssueMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.GenIssueMas>> GetDataEditReqNoList(string ReqNo)
        {
            try
            {
                var ProductWO = repo.GetDataEditRepReqNoList(ReqNo);

                return new Response<IQueryable<Domain.GenIssueMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.GenIssueMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
