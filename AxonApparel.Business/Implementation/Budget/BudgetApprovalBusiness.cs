using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Common;
namespace AxonApparel.Business
{
    public class BudgetApprovalBusiness : IBudgetApprovalBusiness
    {
        IBudgetApprovalRepository repo = new BudgetApprovalRepository();

        public Common.Response<IQueryable<Domain.BudgetApproval>> LoadMaingrid( string type,string ordtype, string fromdate, string todate)
        {
            try
            {
                var ProductWO = repo.LoadMaingrid( type,ordtype, fromdate, todate);

                return new Response<IQueryable<Domain.BudgetApproval>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.BudgetApproval>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.BudgetApproval>> LoadPcsWt(string ordno, int styleid)
        {
            try
            {
                var ProductWO = repo.LoadPcsWt(ordno, styleid);

                return new Response<IQueryable<Domain.BudgetApproval>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.BudgetApproval>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.Cost_defn_Bom>> LoadBomdet(string ordno, int styleid)
        {
            try
            {
                var ProductWO = repo.LoadBomdet(ordno, styleid);

                return new Response<IQueryable<Domain.Cost_defn_Bom>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Cost_defn_Bom>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.Cost_defn_Bom>> LoadProcessdet(string ordno, int styleid)
        {
            try
            {
                var ProductWO = repo.LoadProcessdet(ordno, styleid);

                return new Response<IQueryable<Domain.Cost_defn_Bom>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Cost_defn_Bom>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.Cost_defn_Bom>> LoadProductndet(string ordno, int styleid)
        {
            try
            {
                var ProductWO = repo.LoadProductndet(ordno, styleid);

                return new Response<IQueryable<Domain.Cost_defn_Bom>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Cost_defn_Bom>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreateUnitEntry(Domain.Cost_Defn_Mas MasEntry)
        {
            try
            {

                var Maslist = new List<Domain.CostDefnBomFirst>();
                foreach (var mas in MasEntry.Listofbomfirst)
                {
                    Maslist.Add(new Domain.CostDefnBomFirst
                       {
                           Profitper = mas.Profitper,
                           CurrencyId = mas.CurrencyId,
                           ExRate = mas.ExRate,
                           CostArrive = mas.CostArrive,
                           SalePrice = mas.SalePrice,
                           sale_Profit = mas.sale_Profit,
                           sale_prf_per = mas.sale_prf_per,
                           Drawback_Percent = mas.Drawback_Percent,
                           pcswt = mas.pcswt,
                           Order_No = mas.Order_No,
                           styleid = mas.styleid,
                           Cost_Defn_id = mas.Cost_Defn_id,
                           CMCost = mas.CMCost,
                           FinPer = mas.FinPer,
                           MarkUpvalue = mas.MarkUpvalue,
                           Gaficharges = mas.Gaficharges,
                           Qizcharges = mas.Qizcharges

                       });
                }


                var ItmList = new List<Cost_Defn_Bom_First>();



                if (MasEntry.Listofbomfirst != null)
                {
                    foreach (var PItem in MasEntry.Listofbomfirst)
                    {
                        int? PID = 0;

                        if (PItem.CurrencyId == 0)
                        {
                            PID = null;
                        }
                        else
                        {
                            PID = PItem.CurrencyId;
                        }

                        if (PItem.Processid == 0)
                        {
                            ItmList.Add(new Cost_Defn_Bom_First
                            {

                                Cost_Defn_id = PItem.Cost_Defn_id,
                                Cost_Defn_BOMid = (PItem.Cost_Defn_BOMid),
                                Cost_defn_bom_firstid = PItem.Cost_defn_bom_firstid,
                                Processid = null,//PItem.Processid,
                                Itemid = PItem.Itemid,
                                ColorID = PItem.ColorID,
                                SizeID = PItem.SizeID,
                                Quantity = PItem.Quantity,
                                Rate = PItem.Rate,
                                //UOMID=PItem.UOMID,
                                Access_Type=PItem.Access_Type,
                                Actual_Qty = PItem.Actual_Qty,
                                Actual_Rate = PItem.Actual_Rate,
                                CurrencyId = PID,//PItem.CurrencyId,
                                CurrencyRate = PItem.CurrencyRate,
                                ExRate = PItem.ExRate,
                                AppRate = PItem.AppRate,
                                AppCurrencyRate = PItem.AppCurrencyRate,
                                //DisplayOption=PItem.DisplayOption,
                                AppQty = PItem.AppQty,
                                //lUpdateDate=null,//PItem.lUpdateDate

                                CMCost = PItem.CMCost,
                                FinPer = PItem.FinPer,
                                MarkUpvalue = PItem.MarkUpvalue,
                                Gaficharges = PItem.Gaficharges,
                                Qizcharges = PItem.Qizcharges

                            });
                        }
                        else
                        {
                            ItmList.Add(new Cost_Defn_Bom_First
                            {

                                Cost_Defn_id = PItem.Cost_Defn_id,
                                Cost_Defn_BOMid = (PItem.Cost_Defn_BOMid),
                                Cost_defn_bom_firstid = PItem.Cost_defn_bom_firstid,
                                Processid = PItem.Processid,
                                Itemid = PItem.Itemid,
                                ColorID = PItem.ColorID,
                                SizeID = PItem.SizeID,
                                Quantity = PItem.Quantity,
                                Rate = PItem.Rate,
                                //UOMID=PItem.UOMID,
                                Access_Type=PItem.Access_Type,
                                Actual_Qty = PItem.Actual_Qty,
                                Actual_Rate = PItem.Actual_Rate,
                                CurrencyId = PID,//PItem.CurrencyId,
                                CurrencyRate = PItem.CurrencyRate,
                                ExRate = PItem.ExRate,
                                AppRate = PItem.AppRate,
                                AppCurrencyRate = PItem.AppCurrencyRate,
                                //DisplayOption=PItem.DisplayOption,
                                AppQty = PItem.AppQty,
                                //lUpdateDate=null,//PItem.lUpdateDate
                                CMCost = PItem.CMCost,
                                FinPer = PItem.FinPer,
                                MarkUpvalue = PItem.MarkUpvalue,
                                Gaficharges = PItem.Gaficharges,
                                Qizcharges = PItem.Qizcharges
                            });
                        }
                    }
                }

                var result = repo.AddDetData(Maslist, ItmList, "Add");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }


        public Response<IQueryable<Domain.Cost_defn_Bom>> LoadBomdetEdit(string ordno, int styleid)
        {
            try
            {
                var ProductWO = repo.LoadBomdetEdit(ordno, styleid);

                return new Response<IQueryable<Domain.Cost_defn_Bom>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Cost_defn_Bom>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.Cost_defn_Bom>> LoadProcessdetEdit(string ordno, int styleid)
        {
            try
            {
                var ProductWO = repo.LoadProcessdetEdit(ordno, styleid);

                return new Response<IQueryable<Domain.Cost_defn_Bom>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Cost_defn_Bom>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.Cost_defn_Bom>> LoadProductndetEdit(string ordno, int styleid)
        {
            try
            {
                var ProductWO = repo.LoadProductndetEdit(ordno, styleid);

                return new Response<IQueryable<Domain.Cost_defn_Bom>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Cost_defn_Bom>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.BudgetApproval>> LoadChkbom(string ordno, int styleid)
        {
            try
            {
                var ProductWO = repo.LoadChkbom(ordno, styleid);

                return new Response<IQueryable<Domain.BudgetApproval>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.BudgetApproval>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.BudgetApproval>> LoadChkProcess(string ordno, int styleid)
        {
            try
            {
                var ProductWO = repo.LoadChkProcess(ordno, styleid);

                return new Response<IQueryable<Domain.BudgetApproval>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.BudgetApproval>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.BudgetApproval>> LoadChkProdutnOrd(string ordno, int styleid)
        {
            try
            {
                var ProductWO = repo.LoadChkProdutnOrd(ordno, styleid);

                return new Response<IQueryable<Domain.BudgetApproval>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.BudgetApproval>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.BudgetApproval>> LoadChkprod(string ordno, int styleid)
        {
            try
            {
                var ProductWO = repo.LoadChkprod(ordno, styleid);

                return new Response<IQueryable<Domain.BudgetApproval>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.BudgetApproval>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.BudgetApproval>> LoadChkCutting(string ordno, int styleid)
        {
            try
            {
                var ProductWO = repo.LoadChkCutting(ordno, styleid);

                return new Response<IQueryable<Domain.BudgetApproval>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.BudgetApproval>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateData(Domain.Cost_Defn_Mas objupd)
        {
            try
            {


                var Maslist = new List<Domain.CostDefnBomFirst>();
                foreach (var mas in objupd.Listofbomfirst)
                {
                    Maslist.Add(new Domain.CostDefnBomFirst
                    {
                        Profitper = mas.Profitper,
                        CurrencyId = mas.CurrencyId,
                        ExRate = mas.ExRate,
                        CostArrive = mas.CostArrive,
                        SalePrice = mas.SalePrice,
                        sale_Profit = mas.sale_Profit,
                        sale_prf_per = mas.sale_prf_per, 
                        Drawback_Percent = mas.Drawback_Percent,
                        pcswt = mas.pcswt,
                        Order_No = mas.Order_No,
                        styleid = mas.styleid,
                        Cost_Defn_id = mas.Cost_Defn_id,
                        CMCost = mas.CMCost,
                        FinPer = mas.FinPer,
                        MarkUpvalue = mas.MarkUpvalue,
                        Gaficharges = mas.Gaficharges,
                        Qizcharges = mas.Qizcharges,
                        Salesratemargin=mas.Salesratemargin,
                        ApprovedBy = mas.ApprovedBy
                    });
                }

                var ItmList = new List<Cost_Defn_Bom_First>();
                if (objupd.Listofbomfirst != null)
                {
                    foreach (var PItem in objupd.Listofbomfirst)
                    {
                        int? PID = 0;

                        if (PItem.CurrencyId == 0)
                        {
                            PID = null;
                        }
                        else
                        {
                            PID = PItem.CurrencyId;
                        }
                        if (PItem.Processid == 0)
                        {
                            ItmList.Add(new Cost_Defn_Bom_First
                            {
                                Cost_Defn_id = PItem.Cost_Defn_id,
                                Cost_Defn_BOMid = (PItem.Cost_Defn_BOMid),
                                Cost_defn_bom_firstid = PItem.Cost_defn_bom_firstid,
                                Processid = null,//PItem.Processid,
                                Itemid = PItem.Itemid,
                                ColorID = PItem.ColorID,
                                SizeID = PItem.SizeID,
                                Quantity = PItem.Quantity,
                                Rate = PItem.Rate,
                                //UOMID=PItem.UOMID,
                                Access_Type=PItem.Access_Type,
                                Actual_Qty = PItem.Actual_Qty,
                                Actual_Rate = PItem.Actual_Rate,
                                CurrencyId = PID,//PItem.CurrencyId,
                                CurrencyRate = PItem.CurrencyRate,
                                ExRate = PItem.ExRate,
                                AppRate = PItem.AppRate,
                                AppCurrencyRate = PItem.AppCurrencyRate,
                                //DisplayOption=PItem.DisplayOption,
                                AppQty = PItem.AppQty,
                                //lUpdateDate=null,//PItem.lUpdateDate
                                CMCost = PItem.CMCost,
                                FinPer = PItem.FinPer,
                                MarkUpvalue = PItem.MarkUpvalue,
                                Gaficharges = PItem.Gaficharges,
                                Qizcharges = PItem.Qizcharges

                            });
                        }
                        else
                        {
                            ItmList.Add(new Cost_Defn_Bom_First
                            {

                                Cost_Defn_id = PItem.Cost_Defn_id,
                                Cost_Defn_BOMid = (PItem.Cost_Defn_BOMid),
                                Cost_defn_bom_firstid = PItem.Cost_defn_bom_firstid,
                                Processid = PItem.Processid,
                                Itemid = PItem.Itemid,
                                ColorID = PItem.ColorID,
                                SizeID = PItem.SizeID,
                                Quantity = PItem.Quantity,
                                Rate = PItem.Rate,
                                //UOMID=PItem.UOMID,
                                Access_Type=PItem.Access_Type,
                                Actual_Qty = PItem.Actual_Qty,
                                Actual_Rate = PItem.Actual_Rate,
                                CurrencyId = PID,// PItem.CurrencyId,
                                CurrencyRate = PItem.CurrencyRate,
                                ExRate = PItem.ExRate,
                                AppRate = PItem.AppRate,
                                AppCurrencyRate = PItem.AppCurrencyRate,
                                //DisplayOption=PItem.DisplayOption,
                                AppQty = PItem.AppQty,
                                //lUpdateDate=null,//PItem.lUpdateDate

                                CMCost = PItem.CMCost,
                                FinPer = PItem.FinPer,
                                MarkUpvalue = PItem.MarkUpvalue,
                                Gaficharges = PItem.Gaficharges,
                                Qizcharges = PItem.Qizcharges

                            });
                        }

                    }
                }

                var result = repo.AddDetData(Maslist, ItmList, "Update");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }


        public Response<bool> RevertData(Domain.Cost_Defn_Mas objrvt)
        {
            try
            {
                var pid = 0;
                var Maslist = new List<Domain.CostDefnBomFirst>();
                foreach (var mas in objrvt.Listofbomfirst)
                {
                    Maslist.Add(new Domain.CostDefnBomFirst
                    {
                        Profitper = mas.Profitper,
                        CurrencyId = mas.CurrencyId,
                        ExRate = mas.ExRate,
                        CostArrive = mas.CostArrive,
                        SalePrice = mas.SalePrice,
                        sale_Profit = mas.sale_Profit,
                        sale_prf_per = mas.sale_prf_per,
                        Drawback_Percent = mas.Drawback_Percent,
                        pcswt = mas.pcswt,
                        Order_No = mas.Order_No,
                        styleid = mas.styleid,
                        Cost_Defn_id = mas.Cost_Defn_id

                    });
                }

                var ItmList = new List<Cost_Defn_Bom_First>();
                foreach (var PItem in objrvt.Listofbomfirst)
                {
                    if (PItem.SizeID == 0 || PItem.Processid == 0)
                    {
                        ItmList.Add(new Cost_Defn_Bom_First
                        {
                            Cost_Defn_id = PItem.Cost_Defn_id,
                            Cost_Defn_BOMid = (PItem.Cost_Defn_BOMid),
                            Cost_defn_bom_firstid = PItem.Cost_defn_bom_firstid,
                            Processid = null,//PItem.Processid,
                            Itemid = PItem.Itemid,
                            ColorID = PItem.ColorID,
                            SizeID = null,// PItem.SizeID,
                            Quantity = PItem.Quantity,
                            Rate = PItem.Rate,
                            //UOMID=PItem.UOMID,
                            Access_Type=PItem.Access_Type,
                            Actual_Qty = PItem.Actual_Qty,
                            Actual_Rate = PItem.Actual_Rate,
                            //CurrencyId=PItem.CurrencyId,
                            CurrencyRate = PItem.CurrencyRate,
                            ExRate = PItem.ExRate,
                            AppRate = PItem.AppRate,
                            AppCurrencyRate = PItem.AppCurrencyRate,
                            //DisplayOption=PItem.DisplayOption,
                            AppQty = PItem.AppQty,
                            //lUpdateDate=null,//PItem.lUpdateDate
                        });
                    }
                    else
                    {
                        ItmList.Add(new Cost_Defn_Bom_First
                        {

                            Cost_Defn_id = PItem.Cost_Defn_id,
                            Cost_Defn_BOMid = (PItem.Cost_Defn_BOMid),
                            Cost_defn_bom_firstid = PItem.Cost_defn_bom_firstid,
                            Processid = PItem.Processid,
                            Itemid = PItem.Itemid,
                            ColorID = PItem.ColorID,
                            SizeID = PItem.SizeID,
                            Quantity = PItem.Quantity,
                            Rate = PItem.Rate,
                            //UOMID=PItem.UOMID,
                            Access_Type=PItem.Access_Type,
                            Actual_Qty = PItem.Actual_Qty,
                            Actual_Rate = PItem.Actual_Rate,
                            //CurrencyId=PItem.CurrencyId,
                            CurrencyRate = PItem.CurrencyRate,
                            ExRate = PItem.ExRate,
                            AppRate = PItem.AppRate,
                            AppCurrencyRate = PItem.AppCurrencyRate,
                            //DisplayOption=PItem.DisplayOption,
                            AppQty = PItem.AppQty,
                            //lUpdateDate=null,//PItem.lUpdateDate


                        });
                    }

                }

                var result = repo.AddDetData(Maslist, ItmList, "Revert");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }


        public Response<bool> LockData(Domain.Cost_Defn_Mas objupd)
        {
            try
            {

                var Maslist = new List<Domain.CostDefnBomFirst>();
                foreach (var mas in objupd.Listofbomfirst)
                {
                    Maslist.Add(new Domain.CostDefnBomFirst
                    {
                        
                        Order_No = mas.Order_No,
                        styleid = mas.styleid,
                        Cost_Defn_id = mas.Cost_Defn_id,

                        LockSeqPrgm =mas.LockSeqPrgm,
                        LockOrder =mas.LockOrder,
                        LockPlanning =mas.LockPlanning,
                        LockConsumption =mas.LockConsumption,
                        LockFabric =mas.LockFabric,
                        LockYarn =mas.LockYarn,
                        LockAccesories =mas.LockAccesories,
                        LockPacking = mas.LockPacking
                    });
                }

                var AItmList = new List<Domain.CostDefnBomFirst>();
                var PItmList = new List<Domain.CostDefnBomFirst>();
                if (objupd.Listofbomfirst != null)
                {
                    foreach (var PItem in objupd.Listofbomfirst)
                    {
                        int? PID = 0;

                        if (PItem.CurrencyId == 0)
                        {
                            PID = null;
                        }
                        else
                        {
                            PID = PItem.CurrencyId;
                        }
                        if (PItem.Processid == 0)
                        {
                            AItmList.Add(new Domain.CostDefnBomFirst
                            {
                                Cost_Defn_id = PItem.Cost_Defn_id,
                                Cost_Defn_BOMid = (PItem.Cost_Defn_BOMid),
                                Cost_defn_bom_firstid = PItem.Cost_defn_bom_firstid,
                                Processid = null,
                                Itemid = PItem.Itemid,
                                ColorID = PItem.ColorID,
                                SizeID = PItem.SizeID,
                                Quantity = PItem.Quantity,
                                Rate = PItem.Rate,                             
                                Access_Type = PItem.Access_Type,
                                Lock = PItem.Lock

                            });
                        }
                        else
                        {
                            PItmList.Add(new Domain.CostDefnBomFirst
                            {

                                Cost_Defn_id = PItem.Cost_Defn_id,
                                Cost_Defn_BOMid = (PItem.Cost_Defn_BOMid),
                                Cost_defn_bom_firstid = PItem.Cost_defn_bom_firstid,
                                Processid = PItem.Processid,
                                Itemid = PItem.Itemid,
                                ColorID = PItem.ColorID,
                                SizeID = PItem.SizeID,
                                Quantity = PItem.Quantity,
                                Rate = PItem.Rate,                             
                                Access_Type = PItem.Access_Type,
                                Lock = PItem.Lock
                            });
                        }

                    }
                }

                var result = repo.LockDetData(Maslist, AItmList, PItmList, "Update");

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
                // return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");

            }
        }



        public Response<IQueryable<Domain.CostDefnCom>> LoadCommdet(string ordno, int styleid)
        {
            try
            {
                var ProductWO = repo.LoadCommdet(ordno, styleid);

                return new Response<IQueryable<Domain.CostDefnCom>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.CostDefnCom>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.CostDefnCom>> LoadCommdetEdit(string ordno, int styleid)
        {
            try
            {
                var ProductWO = repo.LoadCommdetEdit(ordno, styleid);

                return new Response<IQueryable<Domain.CostDefnCom>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.CostDefnCom>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.CostDefnBomFirst>> LoadLockDet(string ordno, int styleid,string Type)
        {
            try
            {
                var ProductWO = repo.LoadLockDet(ordno, styleid, Type);

                return new Response<IQueryable<Domain.CostDefnBomFirst>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.CostDefnBomFirst>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

    }
}
