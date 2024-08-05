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
    public class BoxConversionBusiness : IBoxConversionBusiness
    {
        IBoxConversionRepository repo = new BoxConversionRepository();

        public Response<IQueryable<BoxConversionMas>> GetBussSknDetails()
        {
            try
            {
                var ProductWO = repo.GetRepSknDetails();

                return new Response<IQueryable<BoxConversionMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<BoxConversionMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<BoxConversionDet>> Loaditmsgrid(int masid)
        {
            try
            {
                var ProductWO = repo.Loaditmsgrid(masid);

                return new Response<IQueryable<BoxConversionDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<BoxConversionDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<BulkOrder>> GeRefNoBussDetails(int OrdNo)
        {
            try
            {
                var ProdutWO = repo.GetDataRepRefNoDetails(OrdNo);

                return new Response<IQueryable<BulkOrder>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<BulkOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<BulkOrder>> GeOrdNoBussDetails(int OrdNo)
        {
            try
            {
                var ProdutWO = repo.GetDataRepOrdNoDetails(OrdNo);

                return new Response<IQueryable<BulkOrder>>(ProdutWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<BulkOrder>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<BoxConversionStock>> LoadBussitmsgrid(int masid, int SknMasId)
        {
            try
            {
                var ProductWO = repo.LoadRepitmStockgrid(masid, SknMasId);

                return new Response<IQueryable<BoxConversionStock>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<BoxConversionStock>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateBoxEntry(BoxConversionMas BxEntry)
        {
            int? CunitId = 0;
            int? StoId = 0;
            int? EmpId = 0;
            int? supId = 0;
            if (BxEntry.CompanyUnitId == 0)
            {
                CunitId = null;
            }
            else
            {
                CunitId = BxEntry.CompanyUnitId;
            }

            //if (BxEntry.StoreUnitID == 0)
            //{
            //    StoId = null;
            //}
            //else
            //{
            //    StoId = BxEntry.StoreUnitID;
            //}
            if (BxEntry.CreatedBy == 0)
            {
                EmpId = null;
            }
            else
            {
                EmpId = BxEntry.CreatedBy;
            }


            try
            {

                AxonApparel.Repository.Box_Con_Mas BxInsert = new AxonApparel.Repository.Box_Con_Mas
                {
                    BoxConNo = BxEntry.BoxConNo,
                    CompanyId = BxEntry.CompanyId,
                    CompanyUnitId = CunitId,
                    BoxConDate = BxEntry.BoxConDate,
                    CreatedBy = BxEntry.CreatedBy,
                    OrderNo = BxEntry.OrderNo,
                    Remarks = BxEntry.Remarks,
                    StoreId = BxEntry.StoreId,
                    OType=BxEntry.OType,
                    SktConMasId=BxEntry.SKUMasID,
                    SktConNo=BxEntry.SKUNo,

                };


                var ItmList = new List<Box_Con_Det>();

                foreach (var PItem in BxEntry.BoxConDet)
                {
                    if (PItem.BoxQty > 0)
                    {
                        ItmList.Add(new Box_Con_Det
                        {
                            BoxConMasId = PItem.BoxConMasId,
                            StyleId = PItem.StyleId,
                            SizeId = PItem.SizeId,
                            PcsQty = PItem.PcsQty,
                            BoxQty = PItem.BoxQty,
                            ColorId = PItem.ColorId,
                            Rate=PItem.Rate,


                        });
                    }
                }

                var StkDetails = new List<Box_Con_Stock>();

                if (BxEntry.BoxConStock != null)
                {
                    foreach (var SItem in BxEntry.BoxConStock)
                    {

                        StkDetails.Add(new Box_Con_Stock
                        {

                            AllotedQty = SItem.AllotedQty,
                            BoxConMasId = SItem.BMasId,
                            BoxConDetId = SItem.BoxConDetId,
                            ItemStockId = SItem.ItemStockId,
                            StockQty = SItem.StockQty,
                            Itemid = SItem.Itemid,
                            Colorid = SItem.Colorid,
                            Sizeid = SItem.Sizeid,
                            TransNo = SItem.TransNo,
                            Rate= SItem.Rate,

                        });
                    }
                }

                var result = repo.AddDetData(BxInsert, ItmList, StkDetails, BxEntry.BoxRate);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<BoxConversionMas>> LoadMaingrid(int? CompanyId, int? StoreId, string BoxConNo, string OrderNo, string FromDate, string ToDate, int? BoxMasId)
        {
            try
            {
                var ProductWO = repo.LoadMaingrid(CompanyId, StoreId, BoxConNo, OrderNo, FromDate, ToDate, BoxMasId);

                return new Response<IQueryable<BoxConversionMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
               
            }
            catch (Exception)
            {
                return new Response<IQueryable<BoxConversionMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<BoxConversionDet>> GetitmEditGrid(int masid)
        {
            try
            {
                var ProductWO = repo.GetitmRepEditGrid(masid);

                return new Response<IQueryable<BoxConversionDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<BoxConversionDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<BoxConversionStock>> GetitmEditStockGrid(int masid)
        {
            try
            {
                var ProductWO = repo.GetitmRepEditStockGrid(masid);

                return new Response<IQueryable<BoxConversionStock>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<BoxConversionStock>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateBoxEntry(BoxConversionMas BxUEntry)
        {
            int? CunitId = 0;
            int? StoId = 0;
            int? EmpId = 0;
            int? supId = 0;
            if (BxUEntry.CompanyUnitId == 0)
            {
                CunitId = null;
            }
            else
            {
                CunitId = BxUEntry.CompanyUnitId;
            }

            //if (BxEntry.StoreUnitID == 0)
            //{
            //    StoId = null;
            //}
            //else
            //{
            //    StoId = BxEntry.StoreUnitID;
            //}
            if (BxUEntry.CreatedBy == 0)
            {
                EmpId = null;
            }
            else
            {
                EmpId = BxUEntry.CreatedBy;
            }


            try
            {

                AxonApparel.Repository.Box_Con_Mas Bxupdate = new AxonApparel.Repository.Box_Con_Mas
                {
                    BoxConNo = BxUEntry.BoxConNo,
                    CompanyId = BxUEntry.CompanyId,
                    CompanyUnitId = CunitId,
                    BoxConDate = BxUEntry.BoxConDate,
                    CreatedBy = BxUEntry.CreatedBy,
                    OrderNo = BxUEntry.OrderNo,
                    Remarks = BxUEntry.Remarks,
                    StoreId = BxUEntry.StoreId,
                    OType = BxUEntry.OType,
                    SktConMasId = BxUEntry.SKUMasID,
                    SktConNo = BxUEntry.SKUNo,
                    BoxConMasId=BxUEntry.BoxConMasId,

                };


                var EItmList = new List<Box_Con_Det>();

                foreach (var PItem in BxUEntry.BoxConDet)
                {
                    if (PItem.BoxQty > 0)
                    {
                        EItmList.Add(new Box_Con_Det
                        {
                            BoxConMasId = PItem.BoxConMasId,
                            StyleId = PItem.StyleId,
                            SizeId = PItem.SizeId,
                            PcsQty = PItem.PcsQty,
                            BoxQty = PItem.BoxQty,
                            ColorId = PItem.ColorId,
                            Rate = PItem.Rate,


                        });
                    }
                }

                var EStkDetails = new List<Box_Con_Stock>();

                if (BxUEntry.BoxConStock != null)
                {
                    foreach (var SItem in BxUEntry.BoxConStock)
                    {

                        EStkDetails.Add(new Box_Con_Stock
                        {

                            AllotedQty = SItem.AllotedQty,
                            BoxConMasId = SItem.BoxConMasId,
                            BoxConDetId = SItem.BoxConDetId,
                            ItemStockId = SItem.ItemStockId,
                            StockQty = SItem.StockQty,
                            Itemid = SItem.Itemid,
                            Colorid = SItem.Colorid,
                            Sizeid = SItem.Sizeid,
                            TransNo = SItem.TransNo,
                            Rate = SItem.Rate,
                            OldAllotedQty=SItem.OldPcsQty,

                        });
                    }
                }

                var result = repo.UpdateDetData(Bxupdate, EItmList, EStkDetails, BxUEntry.BoxRate);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> DeleteBoxEntry(BoxConversionMas BxDEntry)
        {
            int? CunitId = 0;
            int? StoId = 0;
            int? EmpId = 0;
            int? supId = 0;
            if (BxDEntry.CompanyUnitId == 0)
            {
                CunitId = null;
            }
            else
            {
                CunitId = BxDEntry.CompanyUnitId;
            }

            //if (BxEntry.StoreUnitID == 0)
            //{
            //    StoId = null;
            //}
            //else
            //{
            //    StoId = BxEntry.StoreUnitID;
            //}
            if (BxDEntry.CreatedBy == 0)
            {
                EmpId = null;
            }
            else
            {
                EmpId = BxDEntry.CreatedBy;
            }


            try
            {

                AxonApparel.Repository.Box_Con_Mas Bxdelete = new AxonApparel.Repository.Box_Con_Mas
                {
                    BoxConNo = BxDEntry.BoxConNo,
                    CompanyId = BxDEntry.CompanyId,
                    CompanyUnitId = CunitId,
                    BoxConDate = BxDEntry.BoxConDate,
                    CreatedBy = BxDEntry.CreatedBy,
                    OrderNo = BxDEntry.OrderNo,
                    Remarks = BxDEntry.Remarks,
                    StoreId = BxDEntry.StoreId,
                    OType = BxDEntry.OType,
                    SktConMasId = BxDEntry.SKUMasID,
                    SktConNo = BxDEntry.SKUNo,
                    BoxConMasId = BxDEntry.BoxConMasId,

                };


                var DItmList = new List<Box_Con_Det>();

                foreach (var PItem in BxDEntry.BoxConDet)
                {
                    if (PItem.BoxQty > 0)
                    {
                        DItmList.Add(new Box_Con_Det
                        {
                            BoxConMasId = PItem.BoxConMasId,
                            StyleId = PItem.StyleId,
                            SizeId = PItem.SizeId,
                            PcsQty = PItem.PcsQty,
                            BoxQty = PItem.BoxQty,
                            ColorId = PItem.ColorId,
                            Rate = PItem.Rate,


                        });
                    }
                }

                var DEStkDetails = new List<Box_Con_Stock>();

                if (BxDEntry.BoxConStock != null)
                {
                    foreach (var SItem in BxDEntry.BoxConStock)
                    {

                        DEStkDetails.Add(new Box_Con_Stock
                        {

                            AllotedQty = SItem.AllotedQty,
                            BoxConMasId = SItem.BoxConMasId,
                            BoxConDetId = SItem.BoxConDetId,
                            ItemStockId = SItem.ItemStockId,
                            StockQty = SItem.StockQty,
                            Itemid = SItem.Itemid,
                            Colorid = SItem.Colorid,
                            Sizeid = SItem.Sizeid,
                            TransNo = SItem.TransNo,
                            Rate = SItem.Rate,
                            OldAllotedQty = SItem.OldPcsQty,

                        });
                    }
                }

                var result = repo.DeleteDetData(Bxdelete, DItmList, DEStkDetails, BxDEntry.BoxRate);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
