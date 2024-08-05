using AxonApparel.Common;
using AxonApparel.Domain;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public class BudgetBusiness : IBudgetBusiness
    {
        IBudgetRepository repo = new BudgetRepository();
        public Common.Response<IQueryable<Domain.Budget>> DisplayBuyerOrderBom(string order_no, int styleid)
        {
            try
            {
                var CurDetList = repo.DisplayBuyerOrderBom(order_no, styleid);

                return new Response<IQueryable<Budget>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Budget>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        //public Response<IQueryable<Budget>> GetBuyerOrder_Store_values(string type, string order_no, int styleid, int costid)
        //{
        //    try
        //    {
        //        var CurDetList = repo.GetBuyerOrder_Store_values(type,order_no, styleid,costid);

        //        return new Response<IQueryable<Budget>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
        //    }
        //    catch (Exception ex)
        //    {
        //        return new Response<IQueryable<Budget>>(null, Status.ERROR, "OOPS error occured. Plase try again");
        //    }
        //}


        public Response<IQueryable<Budget>> GetBudgetDetails(string type, int costid, string orderno, int mode, int styleid)
        {
            try
            {
                var CurDetList = repo.GetBudgetDetailscommdet(type, costid, orderno, mode, styleid);

                return new Response<IQueryable<Budget>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Budget>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Budget>> GetBudgetOrderDetails(string orderno, int styleid)
        {
            try
            {
                var CurDetList = repo.GetBudgetOrderDetails(orderno, styleid);

                return new Response<IQueryable<Budget>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Budget>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Budget>> GetBOMCopy(string OrderNo, int Styleid)
        {
            try
            {
                var CurDetList = repo.GetBOMCopy(OrderNo, Styleid);

                return new Response<IQueryable<Budget>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Budget>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<int> Add(Domain.Cost_Defn_Mas obj)
        {

            int? CurID = 0;
            int? ColorID = 0;
            int? SizeID = 0;
            int? PColorID = 0;
            int? PSizeID = 0;
            int? Uomid = 0;

            try
            {


                AxonApparel.Repository.Cost_Defn_Mas CostBomInsert = new AxonApparel.Repository.Cost_Defn_Mas
                {
                    Cost_Defn_id = obj.Cost_Defn_id,
                    Cost_Defn_date = obj.Cost_Defn_date,
                    Order_No = obj.Order_No,
                    Companyid = obj.Companyid,
                    styleid = obj.styleid,
                    SalePrice = obj.SalePrice,
                    sale_Profit_percent = obj.sale_Profit_percent,
                    Remarks = obj.Remarks,
                    Drawback_Percent = obj.Drawback_Percent,
                    Amend = obj.Amend,
                    CreatedBy = obj.CreatedBy,
                    ApprovedBy = obj.ApprovedBy,
                    Approved = obj.Approved,
                    sale_Profit = obj.sale_Profit,
                    Amend_Reason = obj.Amend_Reason,
                    first_budget = obj.first_budget,
                    Currencyid = obj.Currencyid,
                    Cost_Defn_No = obj.Cost_Defn_No,
                    CMCost = obj.CMCost,
                    FinPer = obj.FinPer,
                    MarkUpvalue = obj.MarkUpvalue,
                    Qizcharges = obj.Qizcharges,
                    Gaficharges = obj.Gaficharges,
                    ImpCharges = obj.ImpCharges,
                    ExpCharges = obj.ExpCharges,

                    FinPerValue = obj.FinPerValue,
                    QizchargesValue = obj.QizchargesValue,
                    GafichargesValue = obj.GafichargesValue,
                    ImpChargesValue = obj.ImpChargesValue,
                    ExpChargesValue = obj.ExpChargesValue,
                    ShipRate = obj.ShipRate,
                    OrdValue = obj.OrderValue,
                    ProfitPercent = obj.ProfitPercent,
                    ExchangeRate = obj.ExchangeRate,
                    PA = obj.PA,
                    Salesratemargin = obj.Salesratemargin
                    

                };

                var detailList = new List<Repository.Cost_Defn_BOM>();

                foreach (var item in obj.ListDetails)
                {
                    if (item.Processid == 0)
                    {
                        if (item.CurrencyID == 0)
                        {
                            CurID = null;
                        }
                        else
                        {
                            CurID = item.CurrencyID;
                        }

                        if (item.Colorid == 0)
                        {
                            ColorID = null;
                        }
                        else
                        {
                            ColorID = item.Colorid;
                        }
                        if (item.Sizeid == 0)
                        {
                            SizeID = null;
                        }
                        else
                        {
                            SizeID = item.Sizeid;
                        }
                        if (item.UOMid == 0)
                        {
                            Uomid = null;
                        }
                        else
                        {
                            Uomid = item.UOMid;
                        }

                        detailList.Add(new Repository.Cost_Defn_BOM
                        {
                            Cost_Defn_id = item.Cost_Defn_id,
                            Cost_Defn_BOMid = item.Cost_Defn_BOMid,
                            Itemid = item.Itemid,
                            Colorid = ColorID,//item.Colorid,
                            Sizeid = SizeID,//item.Sizeid,
                            Quantity = item.Quantity,
                            Rate = item.Rate,
                            UOMid = Uomid,//item.UOMid,
                            CurrencyID = CurID,
                            ExRate = item.ExRate == null ? 0 : item.ExRate,
                            Access_Type = item.Access_Type,
                            //Actual_Qty = item.Actual_Qty==null?0:item.Actual_Qty,
                            IsSecQty = item.IsSecQty,
                            Processid = null,//item.Processid,
                            //Actual_Rate = item.Actual_Rate==null?0:item.Actual_Rate,
                            //AppRate = item.AppRate==null?0:item.AppRate,
                            //AppQty = item.AppQty==null?0:item.AppQty,
                            //AppCurrencyRate = item.AppCurrencyRate==null?0:item.AppCurrencyRate,
                            CurrencyRate = item.CurrencyRate,
                            DisplayOption = item.DisplayOption
                            //FirstRate = item.FirstRate==null?0:item.FirstRate,
                            //SecQty = item.SecQty==null?0:item.SecQty,
                            //AppSecQty = item.AppSecQty==null?0:item.AppSecQty,
                            //ActualSecQty = item.ActualSecQty==null?0:item.ActualSecQty,
                        });
                    }
                    else
                    {
                        if (item.Colorid == 0)
                        {
                            PColorID = null;
                        }
                        else
                        {
                            PColorID = item.Colorid;
                        }
                        if (item.Sizeid == 0)
                        {
                            PSizeID = null;
                        }
                        else
                        {
                            PSizeID = item.Sizeid;
                        }
                        if (item.UOMid == 0)
                        {
                            Uomid = null;
                        }
                        else
                        {
                            Uomid = item.UOMid;
                        }
                        detailList.Add(new Repository.Cost_Defn_BOM
                        {
                            Cost_Defn_id = item.Cost_Defn_id,
                            Cost_Defn_BOMid = item.Cost_Defn_BOMid,
                            Itemid = item.Itemid,
                            Colorid = PColorID,//item.Colorid,
                            Sizeid = PSizeID,//item.Sizeid,
                            Quantity = item.Quantity,
                            Rate = item.Rate,
                            UOMid = Uomid,//item.UOMid,
                            //CurrencyID = item.CurrencyID,
                            CurrencyID = null,
                            //ExRate = item.ExRate == null ? 0 : item.ExRate,
                            Access_Type = item.Access_Type,
                            //Actual_Qty = item.Actual_Qty == null ? 0 : item.Actual_Qty,
                            IsSecQty = item.IsSecQty,
                            Processid = item.Processid,
                            //Actual_Rate = item.Actual_Rate == null ? 0 : item.Actual_Rate,
                            //AppRate = item.AppRate == null ? 0 : item.AppRate,
                            //AppQty = item.AppQty == null ? 0 : item.AppQty,
                            //AppCurrencyRate = item.AppCurrencyRate == null ? 0 : item.AppCurrencyRate,
                            CurrencyRate = item.CurrencyRate,
                            DisplayOption = item.DisplayOption
                            //FirstRate = item.FirstRate == null ? 0 : item.FirstRate,
                            //SecQty = item.SecQty == null ? 0 : item.SecQty,
                            //AppSecQty = item.AppSecQty == null ? 0 : item.AppSecQty,
                            //ActualSecQty = item.ActualSecQty == null ? 0 : item.ActualSecQty,
                        });
                    }
                }

                var List = new List<Repository.Cost_Defn_Com>();
                if (obj.Listofcom != null)
                {
                    foreach (var itemlist in obj.Listofcom)
                    {
                        List.Add(new Repository.Cost_Defn_Com
                        {
                            Cost_Defn_id = itemlist.Cost_Defn_id,
                            Cost_Defn_COMid = itemlist.Cost_Defn_COMid,
                            Particularid = itemlist.Particularid,
                            Cost = itemlist.Cost,
                            Type = itemlist.Type,
                            Remarks = itemlist.Remarks,
                            CostType = itemlist.CostType,
                            AppCost = itemlist.AppCost,
                            Actual_Cost = itemlist.Actual_Cost,
                            FirstRate = itemlist.FirstRate
                        });
                    }
                }

                var result = repo.AddDetData(CostBomInsert, detailList, List, "Add");

                return new Response<int>(1, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception ex)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }


        //public Response<IQueryable<Budget>> GetBuyerOrder_valuess1(string type, string order_no, int styleid, int costid)
        //{
        //    try
        //    {
        //        var CurDetList = repo.GetBuyerOrder_valuess1(type, order_no, styleid, costid);

        //        return new Response<IQueryable<Budget>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
        //    }
        //    catch (Exception ex)
        //    {
        //        return new Response<IQueryable<Budget>>(null, Status.ERROR, "OOPS error occured. Plase try again");
        //    }
        //}

        public Response<bool> Update(Domain.Cost_Defn_Mas obj)
        {

            int? CurID = 0;
            int? ColorID = 0;
            int? SizeID = 0;
            int? PColorID = 0;
            int? PSizeID = 0;
            int? Uomid = 0;
            AxonApparel.Repository.Cost_Defn_Mas CostBomEdit = new AxonApparel.Repository.Cost_Defn_Mas
            {
                Cost_Defn_id = obj.Cost_Defn_id,
                Cost_Defn_No = obj.Cost_Defn_No,
                Order_No = obj.Order_No,
                Cost_Defn_date = obj.Cost_Defn_date,
                Companyid = obj.Companyid,
                Currencyid = obj.Currencyid,
                ExchangeRate = obj.ExchangeRate,
                styleid = obj.styleid,
                ApprovedBy = obj.ApprovedBy,
                CreatedBy = obj.CreatedBy,
                AppRemarks = obj.AppRemarks,
                Amend = obj.Amend,
                SalePrice = obj.SalePrice,
                sale_Profit = obj.sale_Profit,
                sale_Profit_percent = obj.sale_Profit_percent,
                CostArrived = obj.CostArrived,
                AppDate = obj.AppDate,
                Amend_Reason = obj.Amend_Reason,
                first_budget = obj.first_budget,
                Remarks = obj.Remarks,
                Drawback_Percent = obj.Drawback_Percent,
                Approved = obj.Approved,
                CMCost = obj.CMCost,
                FinPer = obj.FinPer,
                MarkUpvalue = obj.MarkUpvalue,
                Qizcharges = obj.Qizcharges,
                Gaficharges = obj.Gaficharges,
                ImpCharges = obj.ImpCharges,
                ExpCharges = obj.ExpCharges,
                BuyerMerchendiser = obj.BuyerMerchen,


                FinPerValue = obj.FinPerValue,
                QizchargesValue = obj.QizchargesValue,
                GafichargesValue = obj.GafichargesValue,
                ImpChargesValue = obj.ImpChargesValue,
                ExpChargesValue = obj.ExpChargesValue,
                ShipRate = obj.ShipRate,
                OrdValue = obj.OrderValue,
                PA = obj.PA,
                ProfitPercent = obj.ProfitPercent,
                Salesratemargin = obj.Salesratemargin
               
            };

            var detailList = new List<Repository.Cost_Defn_BOM>();
            var comlist = new List<Repository.Cost_Defn_Com>();
            if (obj.ListDetails != null || obj.Listofcom != null)
            {
                if (obj.ListDetails.Count > 0)
                {
                    foreach (var item in obj.ListDetails)
                    {

                        if (item.CurrencyID == 0)
                        {
                            CurID = null;
                        }
                        else
                        {
                            CurID = item.CurrencyID;
                        }
                        if (item.Colorid == 0)
                        {
                            ColorID = null;
                        }
                        else
                        {
                            ColorID = item.Colorid;
                        }
                        if (item.Sizeid == 0)
                        {
                            SizeID = null;
                        }
                        else
                        {
                            SizeID = item.Sizeid;
                        }
                        if (item.UOMid == 0)
                        {
                            Uomid = null;
                        }
                        else
                        {
                            Uomid = item.UOMid;
                        }

                        if (item.Processid == 0)
                        {
                            detailList.Add(new Repository.Cost_Defn_BOM
                            {
                                Cost_Defn_id = obj.Cost_Defn_id,
                                Cost_Defn_BOMid = item.Cost_Defn_BOMid,
                                // SecQty = item.SecQty,
                                IsSecQty = item.IsSecQty,
                                Processid = null,//item.Processid,
                                Itemid = item.Itemid,
                                Colorid = ColorID,//item.Colorid,
                                Sizeid = SizeID,//item.Sizeid,
                                Quantity = item.Quantity,
                                Rate = item.Rate,
                                UOMid = Uomid,// item.UOMid,
                                AppSecQty = item.ActualSecQty,
                                Access_Type = item.Access_Type,
                                DisplayOption = item.DisplayOption,
                                //Actual_Qty = item.Actual_Qty,
                                //Actual_Rate = item.Actual_Rate,
                                // CurrencyID = item.CurrencyID
                                CurrencyID = CurID,
                                ExRate = item.ExRate,
                                CurrencyRate = item.CurrencyRate


                            });
                        }
                        else
                        {
                            if (item.Colorid == 0)
                            {
                                PColorID = null;
                            }
                            else
                            {
                                PColorID = item.Colorid;
                            }
                            if (item.Sizeid == 0)
                            {
                                PSizeID = null;
                            }
                            else
                            {
                                PSizeID = item.Sizeid;
                            }
                            if (item.UOMid == 0)
                            {
                                Uomid = null;
                            }
                            else
                            {
                                Uomid = item.UOMid;
                            }

                            detailList.Add(new Repository.Cost_Defn_BOM
                            {
                                Cost_Defn_id = obj.Cost_Defn_id,
                                Cost_Defn_BOMid = item.Cost_Defn_BOMid,
                                //SecQty = item.SecQty,
                                IsSecQty = item.IsSecQty,
                                Processid = item.Processid,
                                Itemid = item.Itemid,
                                Colorid = PColorID,//item.Colorid,
                                Sizeid = PSizeID,//item.Sizeid,
                                Quantity = item.Quantity,
                                Rate = item.Rate,
                                UOMid = Uomid,//item.UOMid,
                                AppSecQty = item.ActualSecQty,
                                Access_Type = item.Access_Type,
                                DisplayOption = item.DisplayOption,
                                //Actual_Qty = item.Actual_Qty,
                                //Actual_Rate = item.Actual_Rate,
                                //CurrencyID = item.CurrencyID
                                CurrencyID = null,
                            });
                        }
                    }

                }
                if (obj.Listofcom != null)
                {
                    foreach (var item in obj.Listofcom)
                    {
                        comlist.Add(new Repository.Cost_Defn_Com
                        {
                            Cost_Defn_id = obj.Cost_Defn_id,
                            Cost_Defn_COMid = item.Cost_Defn_COMid,
                            CostType = item.CostType,
                            Cost = item.Cost,
                            Remarks = item.Remarks,
                            Particularid = item.Particularid,
                            Actual_Cost = item.Actual_Cost,
                            AppCost = item.AppCost,
                            Type = item.Type,
                            FirstRate = item.FirstRate



                        });
                    }

                }
                // var result = repo.AddDetData(detailList, comlist, "Update");

                var result = repo.UpdateData(CostBomEdit, detailList, comlist, "Update");


            }
            else
            {

            }


            return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
        }


        public Response<IQueryable<Budget>> GetBuyerOrder_valuess1(string type, string order_no, int styleid, int costid, int mode, int strwid)
        {
            try
            {
                var CurDetList = repo.GetBuyerOrder_valuess1(type, order_no, styleid, costid, mode, strwid);

                return new Response<IQueryable<Budget>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Budget>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Budget>> GetBuyerOrder_valuess2(string type, string order_no, int styleid, int costid, int mode, int strwid)
        {
            try
            {
                var CurDetList = repo.GetBuyerOrder_valuess2(type, order_no, styleid, costid, mode, strwid);

                return new Response<IQueryable<Budget>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Budget>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<Budget>> GetPreProcessdet(int Proessid, int Itemid, int Colorid, int sizeid)
        {
            try
            {
                var CurDetList = repo.GetPreProcessdet(Proessid, Itemid, Colorid, sizeid);

                return new Response<IQueryable<Budget>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Budget>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Budget>> GetBuyerOrder_Store_valuesforproc(string type, string order_no, int styleid, int costid, int mode, int strwid)
        {
            try
            {
                var CurDetList = repo.GetBuyerOrder_Store_valuesforproc(type, order_no, styleid, costid, mode, strwid);

                return new Response<IQueryable<Budget>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Budget>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Budget>> GetBuyerOrder_Store_valuesforprodtn(string type, string order_no, int styleid, int costid, int mode, int strwid)
        {
            try
            {
                var CurDetList = repo.GetBuyerOrder_Store_valuesforprodtn(type, order_no, styleid, costid, mode, strwid);

                return new Response<IQueryable<Budget>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Budget>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Budget>> GetBudgetDetailsBomedit(string type, int costid, string orderno, int mode, int styleid)
        {
            try
            {
                var CurDetList = repo.GetBudgetDetailsBomedit(type, costid, orderno, mode, styleid);

                return new Response<IQueryable<Budget>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Budget>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Budget>> GetBudgetDetailsMasteredit(string type, int costid, string orderno, int mode, int styleid)
        {
            try
            {
                var CurDetList = repo.GetBudgetDetailsmasteredit(type, costid, orderno, mode,  styleid);

                return new Response<IQueryable<Budget>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Budget>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> Delete(int id)
        {
            return new Response<bool>(repo.DeleteData(id), Status.SUCCESS, "Deleted Successfully");
        }





        public Response<IQueryable<Budget>> GetShipmentwiserate(int stylerowid)
        {
            try
            {
                var CurDetList = repo.GetShipmentwiserate(stylerowid);

                return new Response<IQueryable<Budget>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Budget>>(null, Status.ERROR, "OOPS error occured. Please try again");
            }
        }
        public Response<IQueryable<ProcessQuote>> GetProcessQuoteDet(int ProcId, string WorkOrdNo)
        {
            try
            {
                var detlist = repo.GetProcQuoteDet(ProcId, WorkOrdNo);
                return new Response<IQueryable<ProcessQuote>>(detlist, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<ProcessQuote>>(null, Status.ERROR, "OOPS error occured. Please try again");
            }
        }
        public Response<IQueryable<Vendor>> GetPurchaseQuoteDet(string OrdNo, int ItemId, int colorId, int SizeId)
        {
            try
            {
                var detlist = repo.GetPurchaseQuoteDet( OrdNo,  ItemId,  colorId,  SizeId);
                return new Response<IQueryable<Vendor>>(detlist, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Vendor>>(null, Status.ERROR, "OOPS error occured. Please try again");
            }
        }
    }
}
