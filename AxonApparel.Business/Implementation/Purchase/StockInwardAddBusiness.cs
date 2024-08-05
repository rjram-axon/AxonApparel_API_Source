using AxonApparel.Business.Interface;
using AxonApparel.Common;
using AxonApparel.Repository;
using AxonApparel.Repository.Implementation;
using AxonApparel.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business.Implementation
{
    public class StockInwardAddBusiness : IStockInwardAddBusiness
    {
        IStockInwardAddRepository SRep = new StockInwardAddRepository();

        public Common.Response<IQueryable<Domain.StockInward>> GetjobordnoDetails(int cmpid)
        {
            try
            {
                var ProductWO = SRep.GetjobordernoDetails(cmpid);

                return new Response<IQueryable<Domain.StockInward>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockInward>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.StockInward>> GetordnoDetails(int cmpid)
        {
            try
            {
                var ProductWO = SRep.GetordernoDetails(cmpid);

                return new Response<IQueryable<Domain.StockInward>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockInward>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.StockInward>> GetrefnoDetails(int cmpid)
        {
            try
            {
                var ProductWO = SRep.GetrefnoDetails(cmpid);

                return new Response<IQueryable<Domain.StockInward>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockInward>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.StockInward>> GetitemgrpDetails(string jobordno)
        {
            try
            {
                var ProductWO = SRep.GetitemgrpDetails(jobordno);

                return new Response<IQueryable<Domain.StockInward>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockInward>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.UnitGrnDet>> GetLoadgridDetails(string jobordno)
        {
            try
            {
                var ProductWO = SRep.GetLoadgrid(jobordno);

                return new Response<IQueryable<Domain.UnitGrnDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.UnitGrnDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.StockInward>> GetLoadsupplier()
        {
            try
            {
                var ProductWO = SRep.GetLoadsupplier();

                return new Response<IQueryable<Domain.StockInward>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.StockInward>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.UnitGrnDet>> GetLoadonprocess(string jobordno, int pid)
        {
            try
            {
                var ProductWO = SRep.GetLoadonprocess(jobordno,pid);

                return new Response<IQueryable<Domain.UnitGrnDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.UnitGrnDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.UnitGrnDet>> GetLoadonitmgrp(string jobordno, int itmid)
        {
            try
            {
                var ProductWO = SRep.GetLoadonitmgrp(jobordno, itmid);

                return new Response<IQueryable<Domain.UnitGrnDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.UnitGrnDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateUnitEntry(Domain.UnitGrnMas GrnEntry)
        {
            try
            {

                int? Proid = 0;
                int? cmpid = 0;
                int? untid = 0;
                int? cretdby = 0;
                int? strid = 0;
                if (GrnEntry.ProcessId == 0)
                {
                    Proid = null;
                }
                else
                {
                    Proid = GrnEntry.ProcessId;
                }
                if (GrnEntry.Companyid == 0)
                {
                    cmpid = null;
                }
                else
                {
                    cmpid = GrnEntry.Companyid;
                }
                if (GrnEntry.CompanyUnitid == 0)
                {
                    untid = null;
                }
                else
                {
                    untid = GrnEntry.CompanyUnitid;
                }
                if (GrnEntry.CreatedBy == 0)
                {
                    cretdby = null;
                }
                else
                {
                    cretdby = GrnEntry.CreatedBy;
                }
                if (GrnEntry.StoreUnitID == 0)
                {
                    strid = null;
                }
                else
                {
                    strid = GrnEntry.StoreUnitID;
                }
                //var PurGrnID = SRep.AddData(new AxonApparel.Repository.Unit_Grn_Mas
                AxonApparel.Repository.Unit_Grn_Mas GrnordInsert = new AxonApparel.Repository.Unit_Grn_Mas
                {
                    Unit_GRN_Masid=GrnEntry.Unit_GRN_Masid,
                    ReceiptCat=GrnEntry.ReceiptCat,
                    Job_Ord_No=GrnEntry.Job_Ord_No,
                    Unit_GRN_No=GrnEntry.Unit_GRN_No,
                    Unit_GRN_date=GrnEntry.Unit_GRN_date,
                    Unit_GRN_RefNo=GrnEntry.Unit_GRN_RefNo,
                    Unit_GRN_RefDate=GrnEntry.Unit_GRN_RefDate,
                    Remarks=GrnEntry.Remarks,
                    FromUnit=GrnEntry.FromUnit,
                    CompanyUnitid = untid,//GrnEntry.CompanyUnitid,
                    Companyid = cmpid,//GrnEntry.Companyid,
                    CommitCancel=GrnEntry.CommitCancel,
                    ForUnit = untid,//GrnEntry.ForUnit,
                    RecOrRet=GrnEntry.RecOrRet,
                    UnitOrOther=GrnEntry.UnitOrOther,
                    ProcessId = Proid,//GrnEntry.ProcessId,
                    StoreUnitID = strid,//GrnEntry.StoreUnitID,
                    CreatedBy = cretdby,//GrnEntry.CreatedBy,
                    FromDivision=GrnEntry.FromDivision,
                    ForDivision=GrnEntry.ForDivision
                   

                };

                var ItmList = new List<Unit_Grn_Det>();

                foreach (var PItem in GrnEntry.GrnDet)
                {                   
                        ItmList.Add(new Unit_Grn_Det
                        {
                           Unit_GRN_Detid=PItem.Unit_GRN_Detid,
                           Unit_GRN_Masid = PItem.Unit_GRN_Masid,
                           itemid=PItem.itemid,
                           Colorid=PItem.Colorid,
                           Sizeid=PItem.Sizeid,
                           UOMid = PItem.UOMid,
                           RecptQty = (PItem.RecptQty==null?0:PItem.RecptQty),
                           returnqty = (PItem.returnqty==null?0:PItem.returnqty),
                           //ProgOrManual = PItem.ProgOrManual,
                          //Supplierid = (PItem.Supplierid==null?0:PItem.Supplierid),
                          Supplierid=PItem.Supplierid,
                           SecQty = PItem.SecQty,
                          ItemRemarks = PItem.ItemRemarks,
                           Rate = PItem.Rate,

                        });
                    
                }

                var ItmstkList = new List<ItemStock>();

                foreach (var PItem in GrnEntry.ItmstockDet)
                {
                    ItmstkList.Add(new ItemStock
                    {
                       StockId=PItem.StockId,
                       UnitId = PItem.UnitId,
                       Itemid = PItem.Itemid,
                       Colorid = PItem.Colorid,
                       sizeid = PItem.sizeid,
                       qty = PItem.qty,
                       Rate = PItem.Rate,
                       joborderNo = PItem.joborderNo,
                       TransType = PItem.TransType,
                       Transno = PItem.Transno,
                       alloted = PItem.alloted,
                       ItemCat = PItem.ItemCat,
                       sQty = PItem.sQty,
                       processId = PItem.processId,
                       //lotNo = PItem.lotNo,
                       balQty = PItem.qty,
                       purorprod = PItem.purorprod,
                       transdate = PItem.transdate,
                       supplierid = PItem.supplierid,
                       companyid = PItem.companyid,
                       uomid = PItem.uomid,
                       //MfrId = PItem.MfrId,
                       return_qty = PItem.return_qty,
                       Styleid = PItem.Styleid,
                       unit_or_other = PItem.unit_or_other,
                       ReProg = PItem.ReProg,
                       StockType = PItem.StockType,
                       Remarks = PItem.Remarks,
                       CatType = PItem.CatType==null?"":PItem.CatType,
                       Markup_Rate = PItem.Markup_Rate,
                       //GuomId = PItem.GuomId,
                       ItemCode = PItem.ItemCode==null?"":PItem.ItemCode,
                     BundleNo = PItem.BundleNo==null?"":PItem.BundleNo,
                       //OrderIdent = PItem.OrderIdent,
                     FabricGSM = PItem.FabricGSM==null?"":PItem.FabricGSM,
                       //SectionID = PItem.SectionID,
                       StoreUnitID = PItem.StoreUnitID,
                       StockDate = PItem.StockDate,
                       //ShipRowId = PItem.ShipRowId,
                     //BARCODE = PItem.BARCODE,
                       //slno = PItem.slno,
                    });

                }

                var result = SRep.AddDetData(GrnordInsert,ItmList, ItmstkList, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> Delete(int id)
        {
            return new Response<bool>(SRep.GrnDeleteData(id), Status.SUCCESS, "Deleted Successfully");
        }


        public Response<IQueryable<Domain.UnitGrnMas>> GetLoadoneditgrnno(int mid)
        {
            try
            {
                var ProductWO = SRep.GetLoadgrnnoedit(mid);

                return new Response<IQueryable<Domain.UnitGrnMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.UnitGrnMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.UnitGrnMas>> GetDataMainList(int URNMasid)
        {
            try
            {
                var CurDetList = SRep.GetDataMainList(URNMasid);

                return new Response<IQueryable<Domain.UnitGrnMas>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.UnitGrnMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.UnitGrnDet>> GetLoadgrid(int mid, string jobordno, string type)
        {
            try
            {
                var ProductWO = SRep.GetLoadgrid(mid,jobordno,type);

                return new Response<IQueryable<Domain.UnitGrnDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.UnitGrnDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.UnitGrnMas>> GetLoadoneditdet(string jobordno)
        {
            try
            {
                var ProductWO = SRep.GetLoadgrneditdet(jobordno);

                return new Response<IQueryable<Domain.UnitGrnMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.UnitGrnMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> Update(Domain.UnitGrnMas obj)
        {
            try
            {
                int? Proid = 0;
                int? cmpid = 0;
                int? untid = 0;
                int? cretdby = 0;
                int? strid = 0;
                if (obj.ProcessId == 0)
                {
                    Proid = null;
                }
                else
                {
                    Proid = obj.ProcessId;
                }
                if (obj.Companyid == 0)
                {
                    cmpid = null;
                }
                else
                {
                    cmpid = obj.Companyid;
                }
                if (obj.CompanyUnitid == 0)
                {
                    untid = null;
                }
                else
                {
                    untid = obj.CompanyUnitid;
                }
                if (obj.CreatedBy == 0)
                {
                    cretdby = null;
                }
                else
                {
                    cretdby = obj.CreatedBy;
                }
                if (obj.StoreUnitID == 0)
                {
                    strid = null;
                }
                else
                {
                    strid = obj.StoreUnitID;
                }
                //var PurGrnID = SRep.UpdateData(new AxonApparel.Repository.Unit_Grn_Mas
                 AxonApparel.Repository.Unit_Grn_Mas GrnordEdit = new AxonApparel.Repository.Unit_Grn_Mas
                {
                    Unit_GRN_Masid = obj.Unit_GRN_Masid,
                    ReceiptCat = obj.ReceiptCat,
                    Job_Ord_No = obj.Job_Ord_No,
                    Unit_GRN_No = obj.Unit_GRN_No,
                    Unit_GRN_date = obj.Unit_GRN_date,
                    Unit_GRN_RefNo = obj.Unit_GRN_RefNo,
                    Unit_GRN_RefDate = obj.Unit_GRN_RefDate,
                    Remarks = obj.Remarks,
                    FromUnit = obj.FromUnit,
                    CompanyUnitid =untid,// obj.CompanyUnitid,
                    Companyid =cmpid,// obj.Companyid,
                    CommitCancel = obj.CommitCancel,
                    ForUnit = untid,//obj.ForUnit,
                    RecOrRet = obj.RecOrRet,
                    UnitOrOther = obj.UnitOrOther,
                    ProcessId =Proid,// obj.ProcessId,
                    StoreUnitID = strid,//obj.StoreUnitID,
                    CreatedBy = cretdby,//obj.CreatedBy,
                    FromDivision = obj.FromDivision,
                    ForDivision = obj.ForDivision
                };

                var ItmList = new List<Repository.Unit_Grn_Det>();

                foreach (var PItem in obj.GrnDet)
                {
                    ItmList.Add(new Unit_Grn_Det
                    {
                        Unit_GRN_Detid = PItem.Unit_GRN_Detid,
                        Unit_GRN_Masid = PItem.Unit_GRN_Masid,
                        itemid = PItem.itemid,
                        Colorid = PItem.Colorid,
                        Sizeid = PItem.Sizeid,
                        UOMid = PItem.UOMid,
                        RecptQty = PItem.RecptQty,
                        returnqty = PItem.returnqty,
                        //ProgOrManual = PItem.ProgOrManual,
                         Supplierid = PItem.Supplierid,
                        SecQty = PItem.SecQty,
                        ItemRemarks = PItem.ItemRemarks,
                        Rate = PItem.Rate,
                    });
                }

                var ItmstkList = new List<ItemStock>();

                foreach (var PItem in obj.ItmstockDet)
                {
                    ItmstkList.Add(new ItemStock
                    {
                        StockId = PItem.StockId,
                        UnitId = PItem.UnitId,
                        Itemid = PItem.Itemid,
                        Colorid = PItem.Colorid,
                        sizeid = PItem.sizeid,
                        qty = PItem.qty,
                        Rate = PItem.Rate,
                        joborderNo = PItem.joborderNo,
                        TransType = PItem.TransType,
                        Transno = PItem.Transno,
                        alloted = PItem.alloted,
                        ItemCat = PItem.ItemCat,
                        sQty = PItem.sQty,
                        processId = PItem.processId,
                        //lotNo = PItem.lotNo,
                        balQty = PItem.balQty,
                        purorprod = PItem.purorprod,
                        transdate = PItem.transdate,
                        supplierid = PItem.supplierid,
                        companyid = PItem.companyid,
                        uomid = PItem.uomid,
                        //MfrId = PItem.MfrId,
                        return_qty = PItem.return_qty,
                        Styleid = PItem.Styleid,
                        unit_or_other = PItem.unit_or_other,
                        ReProg = PItem.ReProg,
                        StockType = PItem.StockType,
                        Remarks = PItem.Remarks,
                        CatType = PItem.CatType==null?"":PItem.CatType,
                        Markup_Rate = PItem.Markup_Rate,
                        //GuomId = PItem.GuomId,
                        ItemCode = PItem.ItemCode==null?"":PItem.ItemCode,
                        BundleNo = PItem.BundleNo==null?"":PItem.BundleNo,
                        //OrderIdent = PItem.OrderIdent,
                        FabricGSM = PItem.FabricGSM==null?"":PItem.FabricGSM,
                        //SectionID = PItem.SectionID,
                        StoreUnitID = PItem.StoreUnitID,
                        StockDate = PItem.StockDate,
                        //ShipRowId = PItem.ShipRowId,
                        //BARCODE = PItem.BARCODE,
                        //slno = PItem.slno,
                    });
                }

                var result = SRep.UpdDetData(GrnordEdit,ItmList, ItmstkList, "Update");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
