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
    public class ProcessProgramBusiness : IProcessProgramBusiness
    {
        IProcessProgramRepository ProProgram = new ProcessProgramRepository();

        public Response<IList<ProcessProgram>> GetProcessProgram(string FromDate, string ToDate, int? CompanyId, int? buyerid, string orderno, int? cmpnyunitid, string refno, string prgmtype, string Ordertype, string DispatchClosed)
        {
            try
            {
                var ProProgDt = ProProgram.GetProcessProgram(FromDate, ToDate, CompanyId, buyerid, orderno, cmpnyunitid, refno, prgmtype, Ordertype, DispatchClosed).ToList();

                return new Response<IList<ProcessProgram>>(ProProgDt.ToList(), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<ProcessProgram>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.Process>> GetLastProcessBuss(string JobOrderNo)
        {
            try
            {
                var ProProgDt = ProProgram.GetLastProcess(JobOrderNo).AsQueryable();

                return new Response<IQueryable<Domain.Process>>(ProProgDt.Select(n => new Domain.Process
                    {
                        ProcessId = n.ProcessId,
                        ProcessName = n.Process1,
                        Description = n.Description
                    }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Process>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.Process>> GetCopyProcessList(string Orderno, int Styleid)
        {
            try
            {
                var ProProgDt = ProProgram.GetCopyProcessList(Orderno, Styleid).AsQueryable();

                return new Response<IQueryable<Domain.Process>>(ProProgDt.Select(n => new Domain.Process
                {
                    ProcessId = n.ProcessId,
                    ProcessName = n.Process1,
                    Description = n.Description
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Process>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.Process>> GetLastProcessdllList(string JobOrdNo, int ProdPgmNo)
        {
            try
            {
                var ProProgDt = ProProgram.GetLastProcessdllList(JobOrdNo, ProdPgmNo).AsQueryable();

                return new Response<IQueryable<Domain.Process>>(ProProgDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Process>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProductionProgramming>> GetProductionProgrammingBuss(string JobOrderNo, string Ordertype, string Programtype)
        {
            try
            {
                var ProProgDt = ProProgram.GetProductionProgramming(JobOrderNo, Ordertype, Programtype).AsQueryable();

                return new Response<IQueryable<ProductionProgramming>>(ProProgDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<ProductionProgramming>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<IOTableProcess>> GetIOTableProcessBuss(string OrderNo, string ioType)
        {
            try
            {
                var ProProgDt = ProProgram.GetIOTableProcess(OrderNo, ioType).AsQueryable();

                return new Response<IQueryable<IOTableProcess>>(ProProgDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<IOTableProcess>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }



        public Response<int> CreateProdMas(Domain.ProdPrgMas ProdMasAdd)
        {

            decimal CsecQty = 0;
            try
            {
                AxonApparel.Repository.Prod_Prg_Mas ProInsert = new AxonApparel.Repository.Prod_Prg_Mas
                 //return new Response<int>(ProProgram.AddProductionprgMas(new Repository.Prod_Prg_Mas
                 {
                     ProdPrgid = ProdMasAdd.ProdPrgid,
                     ProdPrgNo = ProdMasAdd.ProdPrgNo,
                     ProcessId = ProdMasAdd.ProcessId,
                     // Process = ProdMasAdd.process,
                     companyid = ProdMasAdd.companyid,
                     // Company1 = ProdMasAdd.company,
                     companyunitid = ProdMasAdd.companyunitid,
                     //  CompanyUnit = ProdMasAdd.companyunit,
                     OrderType = (ProdMasAdd.OrderType == null ? "" : ProdMasAdd.OrderType),
                     ProgramType = (ProdMasAdd.ProgramType == null ? "" : ProdMasAdd.ProgramType),
                     Prog_Seq_No = ProdMasAdd.Prog_Seq_No,
                      remarks=ProdMasAdd.remarks,
                     Job_ord_no = ProdMasAdd.Job_ord_no,
                     //Transfer=ProdMasAdd.Transfer,
                     //Startdate=ProdMasAdd.Startdate,
                     // Enddate=ProdMasAdd.Enddate,
                     ProgDate = ProdMasAdd.ProgDate,
                     Closed = "N",//ProdMasAdd.Closed,
                     IsProportion = ProdMasAdd.IsProportion,
                     Amend = ProdMasAdd.Amend,
                     Approved = ProdMasAdd.Approved,
                     CreatedBy = ProdMasAdd.CreatedBy,
                     ApprovedBy = ProdMasAdd.ApprovedBy,
                     FinalizeAutoPost = ProdMasAdd.FinalizeAutoPost
                 };

                //var t = ProdMasAdd.ProdListInputDetails.Count;

                var detailList = new List<Repository.Prod_Prg_Det>();
                if (ProdMasAdd.ProdListInputDetails != null)
                {
                    if (ProdMasAdd.ProdListInputDetails.Count > 0)
                    {
                        foreach (var item in ProdMasAdd.ProdListInputDetails)
                        {
                           

                            detailList.Add(new Repository.Prod_Prg_Det
                            {
                                Prodprgid = item.Prodprgid,
                                Prodprgdetid = item.Prodprgdetid,
                                Itemid = item.Itemid,
                                Colorid = item.Colorid,
                                Sizeid = item.Sizeid,
                                InorOut = item.InorOut,
                                CatType = item.CatType,
                                ActualPlan_Qty = item.ActualPlan_Qty,
                                Prog_Op_Qty = item.Prog_Op_Qty,
                                AltItem = item.AltItem,
                                Amended = item.Amended,
                                SecQty = CsecQty,
                                Issue_qty = item.Issue_qty,
                                order_qty = item.order_qty
                            });
                        }
                    }
                }

                var detList = new List<Repository.Prod_Prg_Det>();

                if (ProdMasAdd.ProdListOutputtDetails != null)
                {
                    foreach (var item in ProdMasAdd.ProdListOutputtDetails)
                    {
                        detList.Add(new Repository.Prod_Prg_Det
                        {
                            Prodprgid = item.Prodprgid,
                            Prodprgdetid = item.Prodprgdetid,
                            Itemid = item.Itemid,
                            Colorid = item.Colorid,
                            Sizeid = item.Sizeid,
                            InorOut = item.InorOut,
                            CatType = item.CatType,
                            ActualPlan_Qty = item.ActualPlan_Qty,
                            Prog_Op_Qty = item.Prog_Op_Qty,
                            AltItem = item.AltItem,
                            Amended = item.Amended,
                            SecQty=item.SecQty,
                            Issue_qty = item.Issue_qty,
                            order_qty = item.order_qty
                        });
                    }
                }

                var remList = new List<Repository.Prod_OpenPrg_Remarks>();

                if (ProdMasAdd.ProdRemDetails != null)
                {
                    foreach (var item in ProdMasAdd.ProdRemDetails)
                    {
                        remList.Add(new Repository.Prod_OpenPrg_Remarks
                        {
                           ProdPrgId=item.ProdPrgId,
                           Prog_Seq_No=item.Prog_Seq_No,
                           Remarks=item.Remarks,
                           Job_Ord_No=item.Job_Ord_No
                        });
                    }
                }
                var result = ProProgram.AddDetData(ProInsert,detailList, detList, remList, "Add");
                return new Response<int>(1, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception ex)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }


        public Response<IQueryable<ProductionProgramming>> GetProductionProgrammingBussEdit(int id)
        {
            try
            {
                var ProProgDt = ProProgram.GetProductionProgrammingEdit(id).AsQueryable();

                return new Response<IQueryable<ProductionProgramming>>(ProProgDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<ProductionProgramming>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<int> CreateCompMas(CompPrgMas CompMasAdd)
        {
            try
            {
                var CId = ProProgram.AddComponentprgMas(new Repository.Comp_prg_mas
                //return new Response<int>(ProProgram.AddProductionprgMas(new Repository.Prod_Prg_Mas
                {
                    ProdPrgid = CompMasAdd.ProdPrgid,
                    Prodprgno = (CompMasAdd.Prodprgno == "0" ? null : CompMasAdd.Prodprgno),
                    Prog_Seq_No = CompMasAdd.Prog_Seq_No,
                    ProgDate = CompMasAdd.ProgDate,
                    ProcessId = CompMasAdd.ProcessId,
                    ProgramType = CompMasAdd.ProgramType == null ? null : CompMasAdd.ProgramType,
                    companyunitid = CompMasAdd.companyunitid,
                    remarks = CompMasAdd.remarks == null ? null : CompMasAdd.remarks,
                    OrderType = CompMasAdd.OrderType,
                    Closed = CompMasAdd.Closed,
                    Job_ordno = CompMasAdd.Job_ordno,
                    CreatedBy = CompMasAdd.CreatedBy,
                    Approved = CompMasAdd.Approved,
                    companyid = CompMasAdd.companyid,
                    Amend = CompMasAdd.Amend

                });
                var detailList = new List<Repository.Comp_Prg_det>();
                if (CompMasAdd.CompListDet != null)
                {
                    foreach (var item in CompMasAdd.CompListDet)
                    {
                        detailList.Add(new Repository.Comp_Prg_det
                        {
                            Prodprgid = CId,
                            Prodprgdetid = item.Prodprgdetid,
                            Itemid = item.Itemid,
                            Colorid = item.Colorid,
                            Sizeid = item.Sizeid,
                            CatType = item.CatType,
                            ActualPlan_Qty = item.ActualPlan_Qty,
                            Prog_Op_Qty = item.Prog_Op_Qty,
                            Issue_qty = item.Issue_qty,
                            Componentid = item.Componentid,
                            CColorID = item.CColorID,
                            Receipt_Qty = item.Receipt_Qty,
                            Return_Qty = item.Return_Qty,
                            MarkupValue = item.MarkupValue,
                            Rejectedqty = item.Rejectedqty,
                            LastProcessid = item.LastProcessid,
                            IP_MarkupRate=item.IP_MarkupRate,
                            

                        });
                    }
                }
                var result = ProProgram.AddCompDetData(detailList, "Add");

                return new Response<int>(1, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception ex)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }


        public Response<IQueryable<CompList>> GetItem(string JobOrderNo, int styleid, string JoborWrk)
        {
            try
            {
                var ProProgDt = ProProgram.GetItem(JobOrderNo, styleid, JoborWrk).AsQueryable();

                return new Response<IQueryable<CompList>>(ProProgDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CompList>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<CompList>> GetColor(string JobOrderNo, int styleid, string JoborWrk, int itemid)
        {
            try
            {
                var ProProgDt = ProProgram.GetColor(JobOrderNo, styleid, JoborWrk, itemid).AsQueryable();

                return new Response<IQueryable<CompList>>(ProProgDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CompList>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<CompList>> GetComponent(string JobOrderNo, int styleid, string JoborWrk, int itemid, int colorid)
        {
            try
            {
                var ProProgDt = ProProgram.GetComponent(JobOrderNo, styleid, JoborWrk, itemid, colorid).AsQueryable();

                return new Response<IQueryable<CompList>>(ProProgDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CompList>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<CompList>> GetComponentDet(string JobOrderNo, int styleid, int itemid, int colorid, int componentid)
        {
            try
            {
                var ProProgDt = ProProgram.GetComponentDet(JobOrderNo, styleid, itemid, colorid, componentid).AsQueryable();

                return new Response<IQueryable<CompList>>(ProProgDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CompList>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<ProdPrgDet>> GetProdprgedit(int prodprgid)
        {
            try
            {
                var ProProgDt = ProProgram.GetProdprgedit(prodprgid).AsQueryable();

                return new Response<IQueryable<ProdPrgDet>>(ProProgDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<ProdPrgDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<IOTableProcess>> GetProdprgeditlist(int prodprgid)
        {
            try
            {
                var ProProgDt = ProProgram.GetProdprgeditlist(prodprgid).AsQueryable();

                return new Response<IQueryable<IOTableProcess>>(ProProgDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<IOTableProcess>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<IOTableProcess>> GetlastProcessPgmList(int ProdPgmNo, string ioType)
        {
            try
            {
                var ProProgDt = ProProgram.GetlastProcessPgmList(ProdPgmNo, ioType).AsQueryable();

                return new Response<IQueryable<IOTableProcess>>(ProProgDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<IOTableProcess>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }



        public Response<bool> UpdateProd(ProdPrgMas Upd)
        {
            AxonApparel.Repository.Prod_Prg_Mas ProUpd = new AxonApparel.Repository.Prod_Prg_Mas
                        {
                            ProdPrgid = Upd.ProdPrgid,
                            ProdPrgNo = Upd.ProdPrgNo,
                            ProgDate = Upd.ProgDate,
                            OrderType = Upd.OrderType,
                            ProgramType=Upd.ProgramType,
                            Job_ord_no = Upd.Job_ord_no,
                            ProcessId = Upd.ProcessId,
                            // Process=Upd.Process,
                            companyid = Upd.companyid,
                            companyunitid = Upd.companyunitid,
                            Amend = Upd.Amend,
                            Approved = Upd.Approved,
                            remarks=Upd.remarks,
                            ApprovedBy = Upd.ApprovedBy,
                            CreatedBy = Upd.CreatedBy,
                            Closed = Upd.Closed,
                            Prog_Seq_No=Upd.Prog_Seq_No
                        };

            var detailList = new List<Repository.Prod_Prg_Det>();
            if (Upd.ProdListInputDetails != null)
            {
                if (Upd.ProdListInputDetails.Count > 0)
                {
                    foreach (var item in Upd.ProdListInputDetails)
                    {
                        detailList.Add(new Repository.Prod_Prg_Det
                        {
                            Prodprgid = (item.Prodprgid==null?0:item.Prodprgid),
                            Prodprgdetid = item.Prodprgdetid,
                            Itemid = item.Itemid,
                            Colorid = item.Colorid,
                            Sizeid = item.Sizeid,
                            ActualPlan_Qty = item.ActualPlan_Qty,
                            Cancel_Qty = item.Cancel_Qty,
                            InorOut = item.InorOut,
                            IssSecQty = item.IssSecQty,
                            Issue_qty = item.Issue_qty,
                            order_qty=item.order_qty,
                            AltItem = item.AltItem,
                            Receipt_Qty = item.Receipt_Qty,
                            RecptSecQty = item.RecptSecQty,
                            Return_Qty = item.Return_Qty,
                            Prog_Op_Qty = item.Prog_Op_Qty,
                            SecQty=item.SecQty,
                            
                        });
                    }
                    //var result = ProProgram.AddDetData(detailList, "Update");
                }
            }
            else
            {
                //var result = ProProgram.AddDetData(detailList, "Update", Upd.ProdPrgid);
            }

            var detList = new List<Repository.Prod_Prg_Det>();
            if (Upd.ProdListOutputtDetails != null)
            {
                if (Upd.ProdListOutputtDetails.Count > 0)
                {
                    foreach (var item in Upd.ProdListOutputtDetails)
                    {
                        detList.Add(new Repository.Prod_Prg_Det
                        {
                            Prodprgid = (item.Prodprgid == null ? 0 : item.Prodprgid),
                            Prodprgdetid = item.Prodprgdetid,
                            Itemid = item.Itemid,
                            Colorid = item.Colorid,
                            Sizeid = item.Sizeid,
                            ActualPlan_Qty = item.ActualPlan_Qty,
                            Cancel_Qty = item.Cancel_Qty,
                            InorOut = item.InorOut,
                            IssSecQty = item.IssSecQty,
                            Issue_qty = item.Issue_qty,
                            order_qty = item.order_qty,
                            AltItem = item.AltItem,
                            Receipt_Qty = item.Receipt_Qty,
                            RecptSecQty = item.RecptSecQty,
                            Return_Qty = item.Return_Qty,
                            Prog_Op_Qty = item.Prog_Op_Qty,
                            SecQty=item.SecQty
                        });
                    }
                    //var result = ProProgram.AddDetData(detailList, "Update");
                }
            }
            else
            {
                //var result = ProProgram.AddDetData(detailList, "Update", Upd.ProdPrgid);
            }

            var remList = new List<Repository.Prod_OpenPrg_Remarks>();

            if (Upd.ProdRemDetails != null)
            {
                foreach (var item in Upd.ProdRemDetails)
                {
                    remList.Add(new Repository.Prod_OpenPrg_Remarks
                    {
                        ProdPrgId = item.ProdPrgId,
                        Prog_Seq_No = item.Prog_Seq_No,
                        Remarks = item.Remarks,
                        Job_Ord_No = item.Job_Ord_No
                    });
                }
            }
            var result = ProProgram.UpdateProd(ProUpd,detailList, detList, remList, "Update");
            return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
        }


        public Response<bool> UpdateProdApp(ProdPrgMas Upd)
        {
            AxonApparel.Repository.Prod_Prg_Mas ProUpd = new AxonApparel.Repository.Prod_Prg_Mas
            {
                ProdPrgid = Upd.ProdPrgid,
                ProdPrgNo = Upd.ProdPrgNo,
                ProgDate = Upd.ProgDate,
                OrderType = Upd.OrderType,
                ProgramType = Upd.ProgramType,
                Job_ord_no = Upd.Job_ord_no,
                ProcessId = Upd.ProcessId,
                // Process=Upd.Process,
                companyid = Upd.companyid,
                companyunitid = Upd.companyunitid,
                Amend = Upd.Amend,
                Approved = Upd.Approved,
                remarks = Upd.remarks,
                ApprovedBy = Upd.ApprovedBy,
                CreatedBy = Upd.CreatedBy,
                Closed = Upd.Closed,
                Prog_Seq_No = Upd.Prog_Seq_No
            };

            var detailList = new List<Repository.Prod_Prg_Det>();
            if (Upd.ProdListInputDetails != null)
            {
                if (Upd.ProdListInputDetails.Count > 0)
                {
                    foreach (var item in Upd.ProdListInputDetails)
                    {
                        detailList.Add(new Repository.Prod_Prg_Det
                        {
                            Prodprgid = (item.Prodprgid == null ? 0 : item.Prodprgid),
                            Prodprgdetid = item.Prodprgdetid,
                            Itemid = item.Itemid,
                            Colorid = item.Colorid,
                            Sizeid = item.Sizeid,
                            ActualPlan_Qty = item.ActualPlan_Qty,
                            Cancel_Qty = item.Cancel_Qty,
                            InorOut = item.InorOut,
                            IssSecQty = item.IssSecQty,
                            Issue_qty = item.Issue_qty,
                            AltItem = item.AltItem,
                            Receipt_Qty = item.Receipt_Qty,
                            RecptSecQty = item.RecptSecQty,
                            Return_Qty = item.Return_Qty,
                            Prog_Op_Qty = item.Prog_Op_Qty,
                            SecQty = item.SecQty,

                        });
                    }
                    //var result = ProProgram.AddDetData(detailList, "Update");
                }
            }
            else
            {
                //var result = ProProgram.AddDetData(detailList, "Update", Upd.ProdPrgid);
            }

            var detList = new List<Repository.Prod_Prg_Det>();
            if (Upd.ProdListOutputtDetails != null)
            {
                if (Upd.ProdListOutputtDetails.Count > 0)
                {
                    foreach (var item in Upd.ProdListOutputtDetails)
                    {
                        detList.Add(new Repository.Prod_Prg_Det
                        {
                            Prodprgid = (item.Prodprgid == null ? 0 : item.Prodprgid),
                            Prodprgdetid = item.Prodprgdetid,
                            Itemid = item.Itemid,
                            Colorid = item.Colorid,
                            Sizeid = item.Sizeid,
                            ActualPlan_Qty = item.ActualPlan_Qty,
                            Cancel_Qty = item.Cancel_Qty,
                            InorOut = item.InorOut,
                            IssSecQty = item.IssSecQty,
                            Issue_qty = item.Issue_qty,
                            AltItem = item.AltItem,
                            Receipt_Qty = item.Receipt_Qty,
                            RecptSecQty = item.RecptSecQty,
                            Return_Qty = item.Return_Qty,
                            Prog_Op_Qty = item.Prog_Op_Qty,
                            SecQty = item.SecQty
                        });
                    }
                    //var result = ProProgram.AddDetData(detailList, "Update");
                }
            }
            else
            {
                //var result = ProProgram.AddDetData(detailList, "Update", Upd.ProdPrgid);
            }

            var remList = new List<Repository.Prod_OpenPrg_Remarks>();

            if (Upd.ProdRemDetails != null)
            {
                foreach (var item in Upd.ProdRemDetails)
                {
                    remList.Add(new Repository.Prod_OpenPrg_Remarks
                    {
                        ProdPrgId = item.ProdPrgId,
                        Prog_Seq_No = item.Prog_Seq_No,
                        Remarks = item.Remarks,
                        Job_Ord_No = item.Job_Ord_No
                    });
                }
            }
            var result = ProProgram.UpdateProdApp(ProUpd, detailList, detList, remList, "Update");
            return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
        }


        public Response<bool> UpdateComp(CompPrgMas Upd)
        {
            var res = ProProgram.UpdateComp(new Repository.Comp_prg_mas
            {
                ProdPrgid = Upd.ProdPrgid,
                Prodprgno = Upd.Prodprgno,
                ProgDate = Upd.ProgDate,
                OrderType = Upd.OrderType,
                Job_ordno = Upd.Job_ordno,
                ProcessId = Upd.ProcessId,
                // Process=Upd.Process,
                companyid = Upd.companyid,
                companyunitid = Upd.companyunitid,
                Amend = Upd.Amend,
                Approved = Upd.Approved,
                remarks=Upd.remarks,
                CreatedBy = Upd.CreatedBy,
                Closed = Upd.Closed
            });

            var detailList = new List<Repository.Comp_Prg_det>();
            if (Upd.CompListDet != null)
            {
                if (Upd.CompListDet.Count > 0)
                {
                    foreach (var item in Upd.CompListDet)
                    {
                        detailList.Add(new Repository.Comp_Prg_det
                        {
                            Prodprgid = Upd.ProdPrgid,
                            Prodprgdetid = item.Prodprgdetid,
                            Itemid = item.Itemid,
                            Colorid = item.Colorid,
                            Sizeid = item.Sizeid,
                            ActualPlan_Qty = item.ActualPlan_Qty,
                            Issue_qty = item.Issue_qty,
                            Receipt_Qty = item.Receipt_Qty,
                            Return_Qty = item.Return_Qty,
                            Prog_Op_Qty = item.Prog_Op_Qty,
                            MarkupValue = item.MarkupValue,
                            CColorID = item.CColorID,
                            CatType = item.CatType,
                            Componentid = item.Componentid,
                            Rejectedqty = item.Rejectedqty
                        });
                    }
                    var result = ProProgram.AddCompDetData(detailList, "Update");
                }
            }
            else
            {
                var result = ProProgram.AddCompDetData(detailList, "Update", Upd.ProdPrgid);
            }

            return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
        }


        public Response<IQueryable<CompPrgDet>> GetCompprgeditlist(int prodprgid)
        {
            try
            {
                var ProProgDt = ProProgram.GetCompprgeditlist(prodprgid).AsQueryable();

                return new Response<IQueryable<CompPrgDet>>(ProProgDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<CompPrgDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }






        public Response<IList<ProcessProgram>> GetProcessProgramAddList(int? cmpnyid, int? buyerid, int? cmpnyunitid, string orderno, string refno, string ordertype, string prgmtype, int? mode)
        {
            try
            {
                var ProProgDt1 = ProProgram.GetProcessProgramRepAddList(cmpnyid, buyerid, cmpnyunitid, orderno, refno, ordertype, prgmtype, mode);

                return new Response<IList<ProcessProgram>>(ProProgDt1, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<ProcessProgram>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> DeleteProd(int id)
        {
            return new Response<bool>(ProProgram.ProdDeleteData(id), Status.SUCCESS, "Deleted Successfully");
        }

        public Response<bool> DeleteComp(int id)
        {
            return new Response<bool>(ProProgram.CompDeleteData(id), Status.SUCCESS, "Deleted Successfully");
        }


        public Response<IQueryable<ProductionProgramming>> GetProductionProgrammingBussEditOpen(int id)
        {
            try
            {
                var ProProgDt = ProProgram.GetProductionProgrammingEditOpen(id).AsQueryable();

                return new Response<IQueryable<ProductionProgramming>>(ProProgDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<ProductionProgramming>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<ProductionProgramming>> GetProductionProgrammingBussEditOpenmax(int id, int MaxId)
        {
            try
            {
                var ProProgDt = ProProgram.GetProductionProgrammingEditOpenmax(id, MaxId).AsQueryable();

                return new Response<IQueryable<ProductionProgramming>>(ProProgDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<ProductionProgramming>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }



        public Response<IQueryable<ProdPrgMas>> ChkProcessOrd(int prodprgid)
        {
            try
            {
                var ProProgDt = ProProgram.ChkProcessOrd(prodprgid).AsQueryable();

                return new Response<IQueryable<ProdPrgMas>>(ProProgDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<ProdPrgMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        

        public Response<IList<ProdPrgMas>> GetPrgEntryIndCheckItemDetails(string Job_ord_no, string ProdPrgNo, int ProcessId, int Itemid, int Colorid, int Sizeid)
        {
            try
            {
                var ProductEWO = ProProgram.GetDataRepCheckPrgIndDetails(Job_ord_no, ProdPrgNo, ProcessId, Itemid, Colorid, Sizeid);

                return new Response<IList<ProdPrgMas>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<ProdPrgMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<ProdPrgMas>> GetPrgEntryOutCheckItemDetails(string Job_ord_no, string ProdPrgNo, int ProcessId, int Itemid, int Colorid, int Sizeid)
        {
            try
            {
                var ProductEWO = ProProgram.GetDataRepCheckPrgOutDetails(Job_ord_no, ProdPrgNo, ProcessId, Itemid, Colorid, Sizeid);

                return new Response<IList<ProdPrgMas>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<ProdPrgMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<IOTableProcess>> GetProdprgAutolist(int processid, string jobno)
        {
            try
            {
                var ProProgDt = ProProgram.GetProdprgautolist(processid, jobno).AsQueryable();

                return new Response<IQueryable<IOTableProcess>>(ProProgDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<IOTableProcess>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
