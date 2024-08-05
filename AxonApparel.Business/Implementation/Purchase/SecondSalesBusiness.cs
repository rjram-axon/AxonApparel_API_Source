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
    public class SecondsSalesBusiness : ISecondsSalesBusiness
    {

        ISecondsSalesRepository STRK = new SecondsSalesRepository();

        public Response<IList<Domain.FABRIC_SALES_DET>> LoadStockItemDetails(int? CompId, int? unitid, string OrderNo, string Refno, string styleid, int? itemgrpid, string Itemid, string Ordertype)
        {
            try
            {
                var CurRGList = STRK.LoadStockItemDetails(CompId, unitid, OrderNo, Refno, styleid, itemgrpid, Itemid, Ordertype);

                return new Response<IList<Domain.FABRIC_SALES_DET>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Domain.FABRIC_SALES_DET>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> Add(Domain.FABRIC_SALES_MAS POSUEntry)
        {

            //int? LotID = 0;
            //int? TLotID = 0;
            //int? TStoreID = 0;
            //string TType = "";
            //string TJobno = "";
            try
            {


                AxonApparel.Repository.FABRIC_SALES_MAS StkTfrInsertmas = new AxonApparel.Repository.FABRIC_SALES_MAS
                {
                    Fabmasid = POSUEntry.Fabmasid,
                    Companyid = POSUEntry.Companyid,
                    Companyunitid = POSUEntry.Companyunitid,
                    Supplierid = POSUEntry.Supplierid,
                    Entryno = POSUEntry.Entryno,
                    EntryDate = POSUEntry.EntryDate,
                    Item_type = POSUEntry.Item_type,
                    Remarks = POSUEntry.Remarks,
                    GrossAmt = POSUEntry.GrossAmt,
                    ActGrossamt = POSUEntry.ActGrossamt,
                    Addlessamt = POSUEntry.Addlessamt,
                    NetAmt = POSUEntry.NetAmt,
                    currencyid = POSUEntry.currencyid,
                    exchangerate = POSUEntry.exchangerate,
                    dcno = POSUEntry.dcno,
                    shipto = POSUEntry.shipto,
                    invtype = POSUEntry.invtype,
                    Dcdate = POSUEntry.Dcdate,

                };



                var ItmList = new List<AxonApparel.Repository.FABRIC_SALES_DET>();

                foreach (var PItem in POSUEntry.FABRIC_SALES_DET)
                {




                    if (PItem.SalesQty > 0)
                    {

                        ItmList.Add(new AxonApparel.Repository.FABRIC_SALES_DET
                        {
                            FabDetid = PItem.FabDetid,
                            Fabmasid = PItem.Fabmasid,
                            Order_no = PItem.Order_no,
                            Styleid = PItem.Styleid,
                            Transno = PItem.Transno,
                            Itemid = PItem.Itemid,
                            colorid = PItem.colorid,
                            sizeid = PItem.sizeid,
                            hsncode = PItem.hsncode,
                            StockQty = PItem.StockQty,
                            SalesQty = PItem.SalesQty,
                            rate = PItem.rate,
                            amount = PItem.amount,
                            cgst = PItem.cgst,
                            sgst = PItem.sgst,
                            igst = PItem.igst,
                            Totaltaxamount = PItem.Totaltaxamount,
                            Stockid = PItem.Stockid,
                            scolorid = PItem.scolorid,
                            SecSalQty = PItem.SecSalQty,
                            uomid = PItem.uomid,
                            Sec_saluomid = PItem.Sec_saluomid,
                            SecQty = PItem.SecQty,

                        });
                    }
                }

                var ALList = new List<AxonApparel.Repository.FabricSales_AddLess>();


                if (POSUEntry.FabricSales_AddLess != null)
                {

                    foreach (var SItem in POSUEntry.FabricSales_AddLess)
                    {

                        if (SItem.Amount > 0)
                        {

                            ALList.Add(new AxonApparel.Repository.FabricSales_AddLess
                            {
                                Fabmasid = SItem.Fabmasid,
                                FabricsaleAddLessid = SItem.FabricsaleAddLessid,
                                AddLessid = SItem.AddLessid,
                                Percentage = SItem.Percentage,
                                Amount = SItem.Amount,
                                aorl = SItem.aorl,
                            });
                        }
                    }
                }
                var result = STRK.AddDetData(StkTfrInsertmas, ItmList, ALList);



                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> Update(Domain.FABRIC_SALES_MAS POSUEntry)
        {

            //int? LotID = 0;
            //int? TLotID = 0;
            //int? TStoreID = 0;
            //string TType = "";
            //string TJobno = "";
            try
            {


                AxonApparel.Repository.FABRIC_SALES_MAS StkTfrInsertmas = new AxonApparel.Repository.FABRIC_SALES_MAS
                {
                    Fabmasid = POSUEntry.Fabmasid,
                    Companyid = POSUEntry.Companyid,
                    Companyunitid = POSUEntry.Companyunitid,
                    Supplierid = POSUEntry.Supplierid,
                    Entryno = POSUEntry.Entryno,
                    EntryDate = POSUEntry.EntryDate,
                    Item_type = POSUEntry.Item_type,
                    Remarks = POSUEntry.Remarks,
                    GrossAmt = POSUEntry.GrossAmt,
                    ActGrossamt = POSUEntry.ActGrossamt,
                    Addlessamt = POSUEntry.Addlessamt,
                    NetAmt = POSUEntry.NetAmt,
                    currencyid = POSUEntry.currencyid,
                    exchangerate = POSUEntry.exchangerate,
                    dcno = POSUEntry.dcno,
                    shipto = POSUEntry.shipto,
                    invtype = POSUEntry.invtype,
                    Dcdate = POSUEntry.Dcdate,

                };



                var ItmList = new List<AxonApparel.Repository.FABRIC_SALES_DET>();

                foreach (var PItem in POSUEntry.FABRIC_SALES_DET)
                {




                    if (PItem.SalesQty > 0)
                    {

                        ItmList.Add(new AxonApparel.Repository.FABRIC_SALES_DET
                        {
                            FabDetid = PItem.FabDetid,
                            Fabmasid = PItem.Fabmasid,
                            Order_no = PItem.Order_no,
                            Styleid = PItem.Styleid,
                            Transno = PItem.Transno,
                            Itemid = PItem.Itemid,
                            colorid = PItem.colorid,
                            sizeid = PItem.sizeid,
                            hsncode = PItem.hsncode,
                            StockQty = PItem.StockQty,
                            SalesQty = PItem.SalesQty,
                            rate = PItem.rate,
                            amount = PItem.amount,
                            cgst = PItem.cgst,
                            sgst = PItem.sgst,
                            igst = PItem.igst,
                            Totaltaxamount = PItem.Totaltaxamount,
                            Stockid = PItem.Stockid,
                            scolorid = PItem.scolorid,
                            SecSalQty = PItem.SecSalQty,
                            uomid = PItem.uomid,
                            Sec_saluomid = PItem.Sec_saluomid,
                            SecQty = PItem.SecQty,

                        });
                    }
                }

                var ALList = new List<AxonApparel.Repository.FabricSales_AddLess>();

                if (POSUEntry.FabricSales_AddLess != null)
                {
                    foreach (var SItem in POSUEntry.FabricSales_AddLess)
                    {
                        if (SItem.Amount > 0)
                        {
                            ALList.Add(new AxonApparel.Repository.FabricSales_AddLess
                            {
                                Fabmasid = SItem.Fabmasid,
                                FabricsaleAddLessid = SItem.FabricsaleAddLessid,
                                AddLessid = SItem.AddLessid,
                                Percentage = SItem.Percentage,
                                Amount = SItem.Amount,
                                aorl = SItem.aorl,
                            });
                        }
                    }
                }

                var result = STRK.UpdateDetData(StkTfrInsertmas, ItmList, ALList);



                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> Delete(Domain.FABRIC_SALES_MAS POSUEntry)
        {

            //int? LotID = 0;
            //int? TLotID = 0;
            //int? TStoreID = 0;
            //string TType = "";
            //string TJobno = "";
            try
            {


                AxonApparel.Repository.FABRIC_SALES_MAS StkTfrInsertmas = new AxonApparel.Repository.FABRIC_SALES_MAS
                {
                    Fabmasid = POSUEntry.Fabmasid,
                    Companyid = POSUEntry.Companyid,
                    Companyunitid = POSUEntry.Companyunitid,
                    Supplierid = POSUEntry.Supplierid,
                    Entryno = POSUEntry.Entryno,
                    EntryDate = POSUEntry.EntryDate,
                    Item_type = POSUEntry.Item_type,
                    Remarks = POSUEntry.Remarks,
                    GrossAmt = POSUEntry.GrossAmt,
                    ActGrossamt = POSUEntry.ActGrossamt,
                    Addlessamt = POSUEntry.Addlessamt,
                    NetAmt = POSUEntry.NetAmt,
                    currencyid = POSUEntry.currencyid,
                    exchangerate = POSUEntry.exchangerate,
                    dcno = POSUEntry.dcno,
                    shipto = POSUEntry.shipto,
                    invtype = POSUEntry.invtype,
                    Dcdate = POSUEntry.Dcdate,

                };



                var ItmList = new List<AxonApparel.Repository.FABRIC_SALES_DET>();

                foreach (var PItem in POSUEntry.FABRIC_SALES_DET)
                {




                    if (PItem.SalesQty > 0)
                    {

                        ItmList.Add(new AxonApparel.Repository.FABRIC_SALES_DET
                        {
                            FabDetid = PItem.FabDetid,
                            Fabmasid = PItem.Fabmasid,
                            Order_no = PItem.Order_no,
                            Styleid = PItem.Styleid,
                            Transno = PItem.Transno,
                            Itemid = PItem.Itemid,
                            colorid = PItem.colorid,
                            sizeid = PItem.sizeid,
                            hsncode = PItem.hsncode,
                            StockQty = PItem.StockQty,
                            SalesQty = PItem.SalesQty,
                            rate = PItem.rate,
                            amount = PItem.amount,
                            cgst = PItem.cgst,
                            sgst = PItem.sgst,
                            igst = PItem.igst,
                            Totaltaxamount = PItem.Totaltaxamount,
                            Stockid = PItem.Stockid,
                            scolorid = PItem.scolorid,
                            SecSalQty = PItem.SecSalQty,
                            uomid = PItem.uomid,
                            Sec_saluomid = PItem.Sec_saluomid,
                            SecQty = PItem.SecQty,

                        });
                    }
                }

                var ALList = new List<AxonApparel.Repository.FabricSales_AddLess>();
                if (POSUEntry.FabricSales_AddLess != null)
                {
                    foreach (var SItem in POSUEntry.FabricSales_AddLess)
                    {
                        if (SItem.Amount > 0)
                        {
                            ALList.Add(new AxonApparel.Repository.FabricSales_AddLess
                            {
                                Fabmasid = SItem.Fabmasid,
                                FabricsaleAddLessid = SItem.FabricsaleAddLessid,
                                AddLessid = SItem.AddLessid,
                                Percentage = SItem.Percentage,
                                Amount = SItem.Amount,
                                aorl = SItem.aorl,
                            });
                        }
                    }
                }

                var result = STRK.DeleteDetData(StkTfrInsertmas, ItmList, ALList);



                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<Domain.FABRIC_SALES_MAS>> GetMainLoad(string FromDate, string ToDate, string OrderNo, string Refno, int? Styid, int? masid, int? compid, string Otype)
        {
            try
            {
                var CurRGList = STRK.GetMainLoad(FromDate, ToDate, OrderNo, Refno, Styid, masid, compid, Otype);

                return new Response<IList<Domain.FABRIC_SALES_MAS>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Domain.FABRIC_SALES_MAS>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.FABRIC_SALES_MAS>> LoadSSentryno()
        {
            try
            {
                var CurRGList = STRK.LoadSSentryno();

                return new Response<IList<Domain.FABRIC_SALES_MAS>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Domain.FABRIC_SALES_MAS>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.FABRIC_SALES_MAS> LoadEditMasDetails(int masid)
        {
            try
            {
                var CurRGList = STRK.LoadEditMasDetails(masid);

                return new Response<Domain.FABRIC_SALES_MAS>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<Domain.FABRIC_SALES_MAS>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<Domain.FABRIC_SALES_DET>> LoadEditDetDetails(int masid)
        {
            try
            {
                var CurRGList = STRK.LoadEditDetDetails(masid);

                return new Response<IList<Domain.FABRIC_SALES_DET>>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Domain.FABRIC_SALES_DET>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.FABRIC_SALES_DET> LoadStateDetails(int Companyid, int Supplierid)
        {
            try
            {
                var CurRGList = STRK.LoadStateDetails(Companyid, Supplierid);

                return new Response<Domain.FABRIC_SALES_DET>(CurRGList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<Domain.FABRIC_SALES_DET>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

    }
}
