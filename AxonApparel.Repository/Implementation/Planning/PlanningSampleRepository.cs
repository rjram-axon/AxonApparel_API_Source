using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Data.SqlTypes;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class PlanningSampleRepository : IPlanningSampleRepository
    {
        PlanningEntities entities = new PlanningEntities();

        public IQueryable<PlanningSampleMain> GetDataSamRepPlanDetails(int StyleRowId)
        {
            IQueryable<PlanningSampleMain> query = (from a in entities.Proc_Apparel_GetPlanningAddListDetails(StyleRowId)
                                                    select new PlanningSampleMain
                                              {
                                                  Order_No = a.OrderNo,
                                                  Ref_no = a.RefNo,
                                                  Style = a.Style,
                                                  StyleID = a.StyleId,
                                                  Quantity = (int)a.ProdQty,
                                                  buyer = a.Buyer,
                                                  buyerid = a.BuyerId,
                                                  Company = a.Company,
                                                  CompanyID = a.CompanyId,
                                                  StyleRowid = StyleRowId,
                                                  PlanID = a.PlanID,
                                                  EDate = (DateTime)a.Order_Date,
                                                  GUom = a.GUom,
                                                  GUomID = a.GuomId,
                                                  Job_Ord_No = a.WORKORDER,
                                                  BMasID = a.BmasId,
                                                  OrderQty = (int)a.Qty,
                                                  Type = a.OType,
                                                  CompanyUnitID = (int)a.UnitId,
                                                  CompanyUnit=a.Unit,

                                              }).AsQueryable();

            return query;
        }


        public bool AddDetItemData(List<Sample_FabricPlan> objPFDet, List<Sample_FabricPlan> objPYDet, int CompId, int UnitId, DateTime Date,string OrdNo,string JobNo)
        {
            bool reserved = false;
      

            string DateTime = "";
     
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    //Fabric Item

                    foreach (var Fitem in objPFDet)
                    {
                        Fitem.SampleJobNo = JobNo;
                        entities.Sample_FabricPlan.Add(Fitem);
                        entities.SaveChanges();

                    }
                    
                    foreach (var Fitem in objPFDet)
                    {

                        int Pgc = entities.Proc_UpdateSampleEditFabricBOMPlan(JobNo, DateTime, Fitem.ItemID, Fitem.BColorID, Fitem.FColorID, Fitem.SizeID, Fitem.ProgramQty, Fitem.BPurQty, Fitem.FPurQty, OrdNo, CompId, UnitId);
                        entities.SaveChanges();
                    }

                    //Yarn Item

                    foreach (var Yitem in objPYDet)
                    {
                        Yitem.SampleJobNo = JobNo;
                        entities.Sample_FabricPlan.Add(Yitem);
                        entities.SaveChanges();
                                           
                    }

                    foreach (var Yitem in objPYDet)
                    {
                        int Pgc = entities.Proc_UpdateSampleEditFabricBOMPlan(JobNo, DateTime, Yitem.ItemID, Yitem.BColorID, Yitem.FColorID, Yitem.SizeID, Yitem.ProgramQty, Yitem.BPurQty, Yitem.FPurQty, OrdNo, CompId, UnitId);
                        entities.SaveChanges();
                    }


                    var AppMas = entities.Sample_Ord_PlanMas.Where(c => c.Sample_Job_No == JobNo).FirstOrDefault();
                    if (AppMas != null)
                    {
                        AppMas.PlanDate = Date;                       
                    }
                    entities.SaveChanges();
             
                    ////Insert into Programm Summary
                    var Pgy1 = entities.Proc_SaveSamplePrgSum(JobNo);
                    entities.SaveChanges();
                    //


                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }
        public IQueryable<PlanningSampleMain> GetDataEditSamRepPlanDetails(int StyleRowId)
        {
            string OType = "";

            string OrdNo = "";

            var OQuery = entities.buy_ord_style.Where(b => b.StyleRowid == StyleRowId).FirstOrDefault();
            if (OQuery != null)
            {
                OrdNo = OQuery.order_no;
            }


            var OQuery1 = entities.Buy_Ord_Mas.Where(b => b.Order_No == OrdNo).FirstOrDefault();
            if (OQuery1 != null)
            {
                OType = OQuery1.OrdType;
            }


            IQueryable<PlanningSampleMain> query = (from a in entities.Proc_Apparel_GetPlanningSampleDomEditDetails(StyleRowId, OType)
                                                    select new PlanningSampleMain
                                                    {
                                                        Order_No = a.Order_No,
                                                        Ref_no = a.Ref_No,
                                                        Style = a.style,
                                                        StyleID = a.StyleId,
                                                        Company = a.company,
                                                        CompanyID = (int)a.companyid,
                                                        StyleRowid = StyleRowId,                                                   
                                                        EDate = (DateTime)a.PlanDate,                                                      
                                                        Job_Ord_No = a.workorder,                                             
                                                        Type = a.OrdType,
                                                        CompanyUnitID = (int)a.company_unitid,
                                                        CompanyUnit = a.companyunit,

                                                    }).AsQueryable();

            return query;
        }


        public IList<PlanningSampleFabricDet> GetRepFabDetList(int StyleRowId, string OType)
        {
            var query = (from YD in entities.Proc_Apparel_GetPlanningSampleDomEditFabItemList(StyleRowId, OType)
                         select new PlanningSampleFabricDet
                         {
                             SNo = (int)YD.FSNo,
                             SFDetID = YD.SamFabPlanID,
                             FabItemID = (int)YD.itemid,
                             BColorID = (int)YD.Bcolorid,
                             FColorID = (int)YD.fColorid,
                             SizeID = (int)YD.Sizeid,
                             ProgramQty = (decimal)YD.ProgramQty,
                             PrintColorID = (int)YD.PrintColorId,
                             BPurQty = YD.BpurQty,
                             FPurQty = YD.FPurQty,
                             FabItem=YD.item,
                             BColor=YD.BAseColor,
                             PColor=YD.PColor,
                             FColor=YD.FinColor,
                             Size=YD.size,
                            
                             
                         }).AsQueryable();

            return query.ToList();
        }

        public IList<PlanningSampleFabricDet> GetRepYarnDetList(int StyleRowId, string OType)
        {
            var query = (from YD in entities.Proc_Apparel_GetPlanningSampleDomEditYarnItemList(StyleRowId, OType)
                         select new PlanningSampleFabricDet
                         {
                             SNo = (int)YD.FSno,
                             SFDetID = YD.SamFabPlanID,
                             FabItemID = (int)YD.fabricid,
                             BColorID = (int)YD.Bcolorid,
                             FColorID = (int)YD.fColorid,
                             SizeID = (int)YD.Sizeid,
                             ProgramQty = (decimal)YD.PrgQty,                   
                             BPurQty = YD.BpurQty,
                             FPurQty = YD.FPurQty,
                             YSNo = (int)YD.ysno,
                             Yarn = YD.item,
                             BColor = YD.BAseColor,                             
                             FColor = YD.FinColor,
                             Size = YD.size,
                             YItemID=(int)YD.itemid,
                         }).AsQueryable();

            return query.ToList();
        }


        public bool UpdateDetItemData(List<Sample_FabricPlan> objEPFDet, List<Sample_FabricPlan> objEPYDet, int CompId, int UnitId, DateTime Date, string OrdNo, string JobNo)
        {
            bool reserved = false;


            string DateTime = "";

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    //Delete the Sample_FabricPlan for Update Case 
                    
                    var Pg4 = entities.Proc_Apparel_GetPlanningDeleSample(JobNo);
                    entities.SaveChanges();                       
              
                    //


                    foreach (var Fitem in objEPFDet)
                    {
                        Fitem.SampleJobNo = JobNo;
                        entities.Sample_FabricPlan.Add(Fitem);
                        entities.SaveChanges();

                    }

                    foreach (var Fitem in objEPFDet)
                    {

                        int Pgc = entities.Proc_UpdateSampleEditFabricBOMPlan(JobNo, DateTime, Fitem.ItemID, Fitem.BColorID, Fitem.FColorID, Fitem.SizeID, Fitem.ProgramQty, Fitem.BPurQty, Fitem.FPurQty, OrdNo, CompId, UnitId);
                        entities.SaveChanges();
                    }

                    foreach (var Yitem in objEPYDet)
                    {
                        Yitem.SampleJobNo = JobNo;
                        entities.Sample_FabricPlan.Add(Yitem);
                        entities.SaveChanges();

                    }

                    foreach (var Yitem in objEPYDet)
                    {
                        int Pgc = entities.Proc_UpdateSampleEditFabricBOMPlan(JobNo, DateTime, Yitem.ItemID, Yitem.BColorID, Yitem.FColorID, Yitem.SizeID, Yitem.ProgramQty, Yitem.BPurQty, Yitem.FPurQty, OrdNo, CompId, UnitId);
                        entities.SaveChanges();
                    }

                    var AppMas = entities.Sample_Ord_PlanMas.Where(c => c.Sample_Job_No == JobNo).FirstOrDefault();
                    if (AppMas != null)
                    {
                        AppMas.PlanDate = Date;
                    }
                    entities.SaveChanges();
                    ////Insert into Programm Summary
                    var Pgy1 = entities.Proc_SaveSamplePrgSum(JobNo);
                    entities.SaveChanges();
                    //


                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }

        public bool DeleteDetItemData(List<Sample_FabricPlan> objDPFDet, List<Sample_FabricPlan> objDPYDet, int CompId, int UnitId, DateTime Date, string OrdNo, string JobNo)
        {
            bool reserved = false;
            int SPlanId = 0;

            string DateTime = "";

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    //Delete the Sample_FabricPlan for Update Case 

                    var Pg4 = entities.Proc_Apparel_GetPlanningDeleSample(JobNo);
                    entities.SaveChanges();

                    //
                    


                    var OQueryBom = entities.Sample_Ord_PlanMas.Where(b => b.Order_No == OrdNo && b.Sample_Job_No == JobNo ).FirstOrDefault();
                    if (OQueryBom != null)
                    {
                        SPlanId = (int)OQueryBom.SPlanId;

                    }

                    var FbbomDet = entities.Sample_Ord_PlanDet.Where(u => u.SPlanid == SPlanId);

                    foreach (var Bom in FbbomDet)
                    {
                        entities.Sample_Ord_PlanDet.Remove(Bom);
                    }
                    entities.SaveChanges();

                    var Fbbommas = entities.Sample_Ord_PlanMas.Where(u => u.SPlanId == SPlanId);

                    foreach (var Bomas in Fbbommas)
                    {
                        entities.Sample_Ord_PlanMas.Remove(Bomas);
                    }
                    entities.SaveChanges();


                    ////Delete into Programm Summary
                    var Pgy1 = entities.Proc_DeleteSampleProgSummary(JobNo);
                    entities.SaveChanges();
                    //


                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }
    }
}
