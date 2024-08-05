using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;

namespace AxonApparel.Business
{
   public class OpeningStockBusiness:IOpeningStockBusiness
    {
       IOpeningStockRepository OsRep = new OpeningStockRepository();

       public Common.Response<IQueryable<Domain.ItmStkDet>> GetItem(int itmgrpid, string itmcat)
       {
           try
           {
               var ProductWO = OsRep.GetItem(itmgrpid,itmcat);

               return new Response<IQueryable<Domain.ItmStkDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ItmStkDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ItmStkDet>> GetUom(int itmid)
       {
           try
           {
               var ProductWO = OsRep.GetUom(itmid);

               return new Response<IQueryable<Domain.ItmStkDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ItmStkDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }

       public Response<IQueryable<Domain.ItmStkDet>> ChkPlanned(string OrderNo, int Styleid, int Itemid, int Colorid, int Sizeid)
       {
           try
           {
               var ProductWO = OsRep.ChkPlanned(OrderNo, Styleid, Itemid, Colorid, Sizeid);

               return new Response<IQueryable<Domain.ItmStkDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ItmStkDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<bool> CreateEntry(Domain.ItemStockDom Entry)
       {
           int? secid = 0;
           int? shiprwid = 0;
           int? guomid = 0;
           int? StyId = 0;
           try
           {
               //var StkID = OsRep.AddData(new AxonApparel.Repository.ItemStock
               //{                  
               //    StockId=Entry.StockId,
               //    //UnitId=Entry.UnitId,
               //    //Itemid=Entry.Itemid,
               //    //Colorid=Entry.Colorid,
               //    //sizeid=Entry.sizeid,
               //    //Rate=Entry.Rate,
               //    //joborderNo=Entry.joborderNo,
               //    //unit_or_other=Entry.unit_or_other,
               //    StockDate=Entry.StockDate,
               //    //StockType=Entry.StockType,
               //    StoreUnitID=Entry.StoreUnitID,
               //    //Styleid=Entry.Styleid,
               //    Transno=Entry.Transno,
               //    transdate=Entry.transdate,
               //    //TransType=Entry.TransType,
               //    //alloted=Entry.alloted,
               //    //sQty=Entry.sQty,
               //    //lotNo=Entry.lotNo,
               //    //balQty=Entry.balQty,
               //    companyid=Entry.companyid,
               //    //supplierid=Entry.supplierid,
               //    //ReProg=Entry.ReProg,
               //    //Markup_Rate=Entry.Markup_Rate,
               //    //uomid=Entry.uomid,
               //    //ItemCat=Entry.ItemCat,
               //    //qty=Entry.qty,
               //    //purorprod=Entry.purorprod,

               //});

               var ItmList = new List<ItemStock>();

               foreach (var PItem in Entry.ItemStk)
               {
                   if (PItem.SectionID == 0)
                   {
                       secid = null;
                   }
                   else
                   {
                       secid = PItem.SectionID;
                   }
                   if (PItem.Styleid == 0)
                   {
                       StyId = null;
                   }
                   else
                   {
                       StyId = PItem.Styleid;
                   }

                   if (PItem.ShipRowId == 0)
                   {
                       shiprwid = null;
                   }
                   else
                   {
                       shiprwid = PItem.ShipRowId;
                   }

                   if (PItem.GuomId == 0)
                   {
                       guomid = null;
                   }
                   else
                   {
                       guomid = PItem.GuomId;
                   }
                   ItmList.Add(new ItemStock
                   {
                       StockId = PItem.StockId,
                       UnitId = PItem.UnitId,
                       Itemid = PItem.Itemid,
                       Colorid = PItem.Colorid,
                       sizeid = PItem.sizeid,
                       Rate = PItem.Rate,
                       joborderNo = PItem.joborderNo,
                       unit_or_other = PItem.unit_or_other,
                       StockDate = PItem.StockDate,
                       StockType = PItem.StockType,
                       StoreUnitID = PItem.StoreUnitID,
                       Styleid =StyId,// PItem.Styleid,
                       Transno = PItem.Transno,
                       transdate = PItem.transdate,
                       TransType = PItem.TransType,
                       alloted = PItem.alloted,
                       sQty = PItem.sQty,
                       lotNo = PItem.lotNo,
                       balQty = PItem.balQty,
                       companyid = PItem.companyid,
                       supplierid = PItem.supplierid,
                       ReProg = PItem.ReProg,
                       Markup_Rate = PItem.Markup_Rate,
                       uomid = PItem.uomid,
                       ItemCat = PItem.ItemCat,
                       qty = PItem.qty,
                       purorprod = PItem.purorprod,
                       SectionID=secid,
                       ShipRowId=shiprwid,
                       GuomId=guomid,
                       BundleNo="",//PItem.BundleNo,
                       ItemCode="",//PItem.ItemCode,
                       FabricGSM="",//PItem.FabricGSM,
                       CatType="",//PItem.CatType
                       

                   });

               }

               var OpList = new List<Op_Stock>();

               foreach (var Item in Entry.OpStk)
               {
                   OpList.Add(new Op_Stock
                   {
                       OpStkId=Item.OpStkId,
                       Companyid = Item.Companyid,
                       Stockid=Item.Stockid,
                       StoreUnitID=Item.StoreUnitID,
                       Op_Stock_No=Item.Op_Stock_No,
                       Remarks=Item.Remarks,
                       CreatedBy=Item.CreatedBy,
                       CompanyunitId=Item.CompanyunitId
                   });
               }
               var result = OsRep.AddDetData(ItmList, OpList, Entry.companyid, Entry.Transno, Entry.CreBy, Entry.StoreUnitID, Entry.Remarks, "Add", Entry.CompanyunitId);
               return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
           }
           
            
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
       }


       public Response<bool> Update(Domain.ItemStockDom obj)
       {
           int? secid = 0;
           int? shiprwid = 0;
           int? guomid = 0;
           int? StyId = 0;
           try
           {
               //var StkID = OsRep.AddData(new AxonApparel.Repository.ItemStock
               //{                  
               //    StockId=Entry.StockId,
               //    //UnitId=Entry.UnitId,
               //    //Itemid=Entry.Itemid,
               //    //Colorid=Entry.Colorid,
               //    //sizeid=Entry.sizeid,
               //    //Rate=Entry.Rate,
               //    //joborderNo=Entry.joborderNo,
               //    //unit_or_other=Entry.unit_or_other,
               //    StockDate=Entry.StockDate,
               //    //StockType=Entry.StockType,
               //    StoreUnitID=Entry.StoreUnitID,
               //    //Styleid=Entry.Styleid,
               //    Transno=Entry.Transno,
               //    transdate=Entry.transdate,
               //    //TransType=Entry.TransType,
               //    //alloted=Entry.alloted,
               //    //sQty=Entry.sQty,
               //    //lotNo=Entry.lotNo,
               //    //balQty=Entry.balQty,
               //    companyid=Entry.companyid,
               //    //supplierid=Entry.supplierid,
               //    //ReProg=Entry.ReProg,
               //    //Markup_Rate=Entry.Markup_Rate,
               //    //uomid=Entry.uomid,
               //    //ItemCat=Entry.ItemCat,
               //    //qty=Entry.qty,
               //    //purorprod=Entry.purorprod,

               //});

               var ItmList = new List<ItemStock>();

               foreach (var PItem in obj.ItemStk)
               {
                   if (PItem.SectionID == 0)
                   {
                       secid = null;
                   }
                   else
                   {
                       secid = PItem.SectionID;
                   }

                   if (PItem.ShipRowId == 0)
                   {
                       shiprwid = null;
                   }
                   else
                   {
                       shiprwid = PItem.ShipRowId;
                   }
                   if (PItem.Styleid == 0)
                   {
                       StyId = null;
                   }
                   else
                   {
                       StyId = PItem.Styleid;
                   }
                   if (PItem.GuomId == 0)
                   {
                       guomid = null;
                   }
                   else
                   {
                       guomid = PItem.GuomId;
                   }
                   ItmList.Add(new ItemStock
                   {
                       StockId = PItem.StockId,
                       UnitId = PItem.UnitId,
                       Itemid = PItem.Itemid,
                       Colorid = PItem.Colorid,
                       sizeid = PItem.sizeid,
                       Rate = PItem.Rate,
                       joborderNo = PItem.joborderNo,
                       unit_or_other ="P",// PItem.unit_or_other,
                       StockDate = obj.StockDate,
                       StockType = PItem.StockType,
                       StoreUnitID = PItem.StoreUnitID,
                       Styleid = StyId,//PItem.Styleid,
                       Transno = PItem.Transno,
                       transdate = obj.transdate,
                       TransType ="OPS",// PItem.TransType,
                       alloted = PItem.alloted,//PItem.alloted,
                       sQty = PItem.sQty,
                       lotNo = PItem.lotNo,
                       balQty = PItem.balQty,// PItem.balQty,
                       companyid = PItem.companyid,
                       supplierid = PItem.supplierid,
                       ReProg ="N",// PItem.ReProg,
                       Markup_Rate = PItem.Markup_Rate,// PItem.Markup_Rate,
                       uomid = PItem.uomid,//PItem.uomid,
                       ItemCat = PItem.ItemCat,
                       qty = PItem.qty,
                       purorprod = "OP",//PItem.purorprod,
                       SectionID = secid,
                       ShipRowId = shiprwid,
                       GuomId = guomid,
                       BundleNo = "",//PItem.BundleNo,
                       ItemCode = "",//PItem.ItemCode,
                       FabricGSM = "",//PItem.FabricGSM,
                       CatType = "",//PItem.CatType
                       Remarks=obj.Remarks

                   });

               }

               var OpList = new List<Op_Stock>();
               if (obj.OpStk != null)
               {
                   foreach (var Item in obj.OpStk)
                   {
                       OpList.Add(new Op_Stock
                       {
                           //OpStkId = Item.OpStkId,
                           Companyid = obj.companyid,
                           //Stockid = Item.Stockid,
                           StoreUnitID = obj.StoreUnitID,
                           Op_Stock_No = obj.Transno,
                           Remarks = obj.Remarks,
                           CreatedBy = obj.CreBy,
                           CompanyunitId = obj.CompanyunitId

                       });
                   }
               }
               //var result = OsRep.UpdateDetData(ItmList, OpList, obj.companyid, obj.Transno, obj.CreBy, obj.StoreUnitID, obj.Remarks);
               var result = OsRep.UpdateDetData(ItmList, OpList, obj.companyid, obj.Transno, obj.CreBy, obj.StoreUnitID, obj.Remarks, obj.CompanyunitId);
              
               return new Response<bool>(true, Status.SUCCESS, "Updated Successfully");
           }


           catch (Exception)
           {
               return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");
           }
       }


       public Response<IQueryable<Domain.ItmStkDet>> GetDataMainList(string ordertype, string transno, int? companyid, string orderno, string refno, int? styleid, string fromDate, string todate)
       {
           try
           {
               var CurDetList = OsRep.GetDataMainList(ordertype,  transno, companyid, orderno, refno, styleid, fromDate, todate);

               return new Response<IQueryable<Domain.ItmStkDet>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IQueryable<Domain.ItmStkDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<bool> Delete(string transno)
       {
           return new Response<bool>(OsRep.DeleteData(transno), Status.SUCCESS, "Deleted Successfully");
       }


       public Response<IQueryable<Domain.ItmStkDet>> GetDataMain(string ordertype, string transno, int? companyid, string orderno, string refno, int? styleid, string fromDate, string todate)
       {
           try
           {
               var CurDetList = OsRep.GetDataMain(ordertype, transno, companyid, orderno, refno, styleid, fromDate, todate);

               return new Response<IQueryable<Domain.ItmStkDet>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
           }
           catch (Exception ex)
           {
               return new Response<IQueryable<Domain.ItmStkDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ItmStkDet>> Geteditgrid(string transno)
       {
           try
           {
               var ProductWO = OsRep.GetEditGrid(transno);

               return new Response<IQueryable<Domain.ItmStkDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ItmStkDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }


       public Response<IQueryable<Domain.ItmStkDet>> GetOrdno(string ordtype)
       {
           try
           {
               var ProductWO = OsRep.GetOrdno(ordtype);

               return new Response<IQueryable<Domain.ItmStkDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               //return res;
           }
           catch (Exception)
           {
               return new Response<IQueryable<Domain.ItmStkDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
           }
       }
    }
}
