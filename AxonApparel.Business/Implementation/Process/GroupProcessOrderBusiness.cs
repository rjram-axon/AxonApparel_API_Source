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
    public class GroupProcessOrderBusiness : IGroupProcessOrderBusiness
    {
        IGroupProcessOrderRepository repo = new GroupProcessOrderRepository();


        public Common.Response<IQueryable<Domain.Group_Prod_Prg_Det>> LoadInputitmsgrid(string closed, string jobordno, string procid)
        {
            try
            {
                var ProductWO = repo.LoadInputitmsgrid(closed, jobordno, procid);

                return new Response<IQueryable<Domain.Group_Prod_Prg_Det>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Group_Prod_Prg_Det>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<IList<Domain.Group_Prod_Prg_Det>> LoadOutputitmsgrid(string closed, string jobordno, string procid)
        {
            try
            {
                var ProductWO = repo.LoadOutputitmsgrid(closed, jobordno, procid);

                return new Response<IList<Domain.Group_Prod_Prg_Det>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Group_Prod_Prg_Det>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<int> CreateProdMas(Domain.Group_Prod_Prg_Mas ProdMasAdd)
        {

            decimal CsecQty = 0;
            try
            {
                 AxonApparel.Repository.Group_Prod_Prg_Mas GrpmasInsert = new AxonApparel.Repository.Group_Prod_Prg_Mas
                {
                    GrpProdPrgid = ProdMasAdd.GrpProdPrgid,
                    GrpProdPrgNo = ProdMasAdd.GrpProdPrgNo,
                    Companyid = ProdMasAdd.Companyid,
                    Styleid = ProdMasAdd.Styleid,
                    Buy_Ord_MasId = ProdMasAdd.Buy_Ord_MasId,
                    Job_ord_no = ProdMasAdd.Job_ord_no,
                    GrpProgDate = ProdMasAdd.GrpProgDate,
                };
                  var IpGrpDetInsert = new List<Repository.Group_Prod_Prg_Det>();
               
                      if (ProdMasAdd.IpGrpdet != null)
                    {
                    if (ProdMasAdd.IpGrpdet.Count > 0)
                    {
                        foreach (var item in ProdMasAdd.IpGrpdet)
                        {
                             IpGrpDetInsert.Add(new Repository.Group_Prod_Prg_Det
                            {
                              
                             GrpProdPgmdetid =item.GrpProdPgmdetid,
                             GrpProdPrgid =item.GrpProdPrgid,
                             Prodprgid =item.Prodprgid,
                             Processid =item.Processid,
                             Itemid =item.Itemid,
                             Colorid =item.Colorid,
                             Sizeid =item.Sizeid,
                             Prog_Op_Qty =item.Prog_Op_Qty,
                             BalanceQty =item.BalanceQty,
                             GrpQty =item.GrpQty,
                             InorOut =item.InorOut,
                             rate=item.rate
                           });
                        }
                    }}


                var OpGrpDetInsert = new List<Repository.Group_Prod_Prg_Det>();
               
                      if (ProdMasAdd.IpGrpdet != null)
                    {
                    if (ProdMasAdd.IpGrpdet.Count > 0)
                    {
                        foreach (var item in ProdMasAdd.OpGrpdet)
                        {
                             OpGrpDetInsert.Add(new Repository.Group_Prod_Prg_Det
                            {
                              
                             GrpProdPgmdetid =item.GrpProdPgmdetid,
                             GrpProdPrgid =item.GrpProdPrgid,
                             Prodprgid =item.Prodprgid,
                             Processid =item.Processid,
                             Itemid =item.Itemid,
                             Colorid =item.Colorid,
                             Sizeid =item.Sizeid,
                             Prog_Op_Qty =item.Prog_Op_Qty,
                             BalanceQty =item.BalanceQty,
                             GrpQty =item.GrpQty,
                             InorOut =item.InorOut,
                             rate = item.rate,
                           });
                        }
                    }}

                      AxonApparel.Repository.ProcessProd_Prg_Mas ProInsert = new AxonApparel.Repository.ProcessProd_Prg_Mas
            
                {
                    ProdPrgid = ProdMasAdd.ProdPrgid,
                    ProdPrgNo = ProdMasAdd.ProdPrgNo,
                    ProcessId = ProdMasAdd.GrpProcessid,
                    companyid = ProdMasAdd.Companyid,
                    companyunitid = ProdMasAdd.Companyid,
                    Job_ord_no = ProdMasAdd.Job_ord_no,
                    ProgDate = ProdMasAdd.GrpProgDate,
                    Closed = "N",
                    Prog_Seq_No = ProdMasAdd.Prog_Seq_No,
                    Amend=ProdMasAdd.Amend,
                    Approved=ProdMasAdd.Approved,
                    FinalizeAutoPost=ProdMasAdd.FinalizeAutoPost,
                    CreatedBy=ProdMasAdd.CreatedBy,
                    ApprovedBy=ProdMasAdd.ApprovedBy

                     
                };

                var detailList = new List<Repository.ProcessProd_Prg_Det>();
                if (ProdMasAdd.ProdListInputDetails != null)
                {
                    if (ProdMasAdd.ProdListInputDetails.Count > 0)
                    {
                        foreach (var item in ProdMasAdd.ProdListInputDetails)
                        {


                            detailList.Add(new Repository.ProcessProd_Prg_Det
                            {
                                Prodprgid = item.Prodprgid,
                                Prodprgdetid = item.Prodprgdetid,
                                Itemid = item.Itemid,
                                Colorid = item.Colorid,
                                Sizeid = item.Sizeid,
                                InorOut = item.InorOut,
                                CatType = "M",
                                ActualPlan_Qty = (decimal)item.Prog_Op_Qty,
                                Prog_Op_Qty = (decimal)item.Prog_Op_Qty,
                                AltItem = item.AltItem,
                                Amended = item.Amended,
                                Issue_qty= item.Issue_qty,
                                order_qty=item.order_qty,
                                GrpQty =item.GrpQty,
                                LastProcessid = 0,
                                BalanceQty = item.BalanceQty,
                                Receipt_Qty = 0,
                                Return_Qty = 0,
                                Damage_qty = 0,
                                Cancel_Qty = 0,
                                Tolerance = 0,
                                Returnable_Qty = 0,
                                Closure_qty = 0,
                                Inp_CancelQty = 0,
                                transferIn = 0,
                                transferOut = 0,
                                IP_MarkupRate = 0,
                                MarkupValue = 0,
                                Dely_Returnqty = 0,
                                Loss_Qty = 0,
                                buy_ord_ship = "O",
                            });
                        }
                    }
                }

                var detList = new List<Repository.ProcessProd_Prg_Det>();

                if (ProdMasAdd.ProdListOutputtDetails != null)
                {
                    foreach (var item in ProdMasAdd.ProdListOutputtDetails)
                    {
                        detList.Add(new Repository.ProcessProd_Prg_Det
                        {
                            Prodprgid = item.Prodprgid,
                            Prodprgdetid = item.Prodprgdetid,
                            Itemid = item.Itemid,
                            Colorid = item.Colorid,
                            Sizeid = item.Sizeid,
                            InorOut = item.InorOut,
                            CatType = "M",
                            ActualPlan_Qty = (decimal)item.Prog_Op_Qty,
                            Prog_Op_Qty = (decimal)item.Prog_Op_Qty,
                            AltItem = item.AltItem,
                            Amended = item.Amended,
                            Issue_qty = item.Issue_qty,
                            order_qty = item.order_qty,
                            GrpQty = item.GrpQty,
                            GrpRate = item.rate,
                            LastProcessid = 0,
                            BalanceQty = item.BalanceQty,
                            Receipt_Qty = 0,
                            Return_Qty = 0,
                            Damage_qty = 0,
                            Cancel_Qty = 0,
                            Tolerance = 0,
                            Returnable_Qty = 0,
                            Closure_qty = 0,
                            Inp_CancelQty = 0,
                            transferIn = 0,
                            transferOut = 0,
                            IP_MarkupRate = 0,
                            MarkupValue = 0,
                            Dely_Returnqty = 0,
                            Loss_Qty = 0,
                            buy_ord_ship = "O",
                           
                        });
                    }
                }


                var result = repo.AddDetData(GrpmasInsert, IpGrpDetInsert, OpGrpDetInsert, ProInsert, detailList, detList, "Add");
                return new Response<int>(1, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception ex)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Response<int> UpdateProdMas(Domain.Group_Prod_Prg_Mas ProdMasAdd)
        {

            decimal CsecQty = 0;
            try
            {
                AxonApparel.Repository.Group_Prod_Prg_Mas GrpmasInsert = new AxonApparel.Repository.Group_Prod_Prg_Mas
                {
                    GrpProdPrgid = ProdMasAdd.GrpProdPrgid,
                    GrpProdPrgNo = ProdMasAdd.GrpProdPrgNo,
                    Companyid = ProdMasAdd.Companyid,
                    Styleid = ProdMasAdd.Styleid,
                    Buy_Ord_MasId = ProdMasAdd.Buy_Ord_MasId,
                    Job_ord_no = ProdMasAdd.Job_ord_no,
                    GrpProgDate = ProdMasAdd.GrpProgDate,
                };
                var IpGrpDetInsert = new List<Repository.Group_Prod_Prg_Det>();

                if (ProdMasAdd.IpGrpdet != null)
                {
                    if (ProdMasAdd.IpGrpdet.Count > 0)
                    {
                        foreach (var item in ProdMasAdd.IpGrpdet)
                        {
                            IpGrpDetInsert.Add(new Repository.Group_Prod_Prg_Det
                            {

                                GrpProdPgmdetid = item.GrpProdPgmdetid,
                                GrpProdPrgid = item.GrpProdPrgid,
                                Prodprgid = item.Prodprgid,
                                Processid = item.Processid,
                                Itemid = item.Itemid,
                                Colorid = item.Colorid,
                                Sizeid = item.Sizeid,
                                Prog_Op_Qty = item.Prog_Op_Qty,
                                BalanceQty = item.BalanceQty,
                                GrpQty = item.GrpQty,
                                InorOut = item.InorOut,
                            });
                        }
                    }
                }


                var OpGrpDetInsert = new List<Repository.Group_Prod_Prg_Det>();

                if (ProdMasAdd.IpGrpdet != null)
                {
                    if (ProdMasAdd.IpGrpdet.Count > 0)
                    {
                        foreach (var item in ProdMasAdd.OpGrpdet)
                        {
                            OpGrpDetInsert.Add(new Repository.Group_Prod_Prg_Det
                            {

                                GrpProdPgmdetid = item.GrpProdPgmdetid,
                                GrpProdPrgid = item.GrpProdPrgid,
                                Prodprgid = item.Prodprgid,
                                Processid = item.Processid,
                                Itemid = item.Itemid,
                                Colorid = item.Colorid,
                                Sizeid = item.Sizeid,
                                Prog_Op_Qty = item.Prog_Op_Qty,
                                BalanceQty = item.BalanceQty,
                                GrpQty = item.GrpQty,
                                InorOut = item.InorOut,
                            });
                        }
                    }
                }

                AxonApparel.Repository.ProcessProd_Prg_Mas ProInsert = new AxonApparel.Repository.ProcessProd_Prg_Mas

                {
                    ProdPrgid = ProdMasAdd.ProdPrgid,
                    ProdPrgNo = ProdMasAdd.ProdPrgNo,
                    ProcessId = ProdMasAdd.GrpProcessid,
                    companyid = ProdMasAdd.Companyid,
                    companyunitid = ProdMasAdd.Companyid,
                    Job_ord_no = ProdMasAdd.Job_ord_no,
                    ProgDate = ProdMasAdd.GrpProgDate,
                    Closed = "N",
                    Prog_Seq_No = ProdMasAdd.Prog_Seq_No,
                    Amend = ProdMasAdd.Amend,
                    Approved = ProdMasAdd.Approved,
                    FinalizeAutoPost = ProdMasAdd.FinalizeAutoPost,
                    CreatedBy = ProdMasAdd.CreatedBy,
                    ApprovedBy = ProdMasAdd.ApprovedBy


                };

                var detailList = new List<Repository.ProcessProd_Prg_Det>();
                if (ProdMasAdd.ProdListInputDetails != null)
                {
                    if (ProdMasAdd.ProdListInputDetails.Count > 0)
                    {
                        foreach (var item in ProdMasAdd.ProdListInputDetails)
                        {


                            detailList.Add(new Repository.ProcessProd_Prg_Det
                            {
                                Prodprgid = item.Prodprgid,
                                Prodprgdetid = item.Prodprgdetid,
                                Itemid = item.Itemid,
                                Colorid = item.Colorid,
                                Sizeid = item.Sizeid,
                                InorOut = item.InorOut,
                                CatType = "M",
                                ActualPlan_Qty = (decimal)item.Prog_Op_Qty,
                                Prog_Op_Qty = (decimal)item.Prog_Op_Qty,
                                AltItem = item.AltItem,
                                Amended = item.Amended,
                                Issue_qty = item.Issue_qty,
                                order_qty = item.order_qty,
                                GrpQty = item.GrpQty,
                                LastProcessid = 0,
                                BalanceQty = item.BalanceQty,
                                Receipt_Qty = 0,
                                Return_Qty = 0,
                                Damage_qty = 0,
                                Cancel_Qty = 0,
                                Tolerance = 0,
                                Returnable_Qty = 0,
                                Closure_qty = 0,
                                Inp_CancelQty = 0,
                                transferIn = 0,
                                transferOut = 0,
                                IP_MarkupRate = 0,
                                MarkupValue = 0,
                                Dely_Returnqty = 0,
                                Loss_Qty = 0,
                                buy_ord_ship = "O",
                            });
                        }
                    }
                }

                var detList = new List<Repository.ProcessProd_Prg_Det>();

                if (ProdMasAdd.ProdListOutputtDetails != null)
                {
                    foreach (var item in ProdMasAdd.ProdListOutputtDetails)
                    {
                        detList.Add(new Repository.ProcessProd_Prg_Det
                        {
                            Prodprgid = item.Prodprgid,
                            Prodprgdetid = item.Prodprgdetid,
                            Itemid = item.Itemid,
                            Colorid = item.Colorid,
                            Sizeid = item.Sizeid,
                            InorOut = item.InorOut,
                            CatType = "M",
                            ActualPlan_Qty = (decimal)item.Prog_Op_Qty,
                            Prog_Op_Qty = (decimal)item.Prog_Op_Qty,
                            AltItem = item.AltItem,
                            Amended = item.Amended,
                            Issue_qty = item.Issue_qty,
                            order_qty = item.order_qty,
                            GrpQty = item.GrpQty,
                            GrpRate = item.rate,
                            LastProcessid = 0,
                            BalanceQty = item.BalanceQty,
                            Receipt_Qty = 0,
                            Return_Qty = 0,
                            Damage_qty = 0,
                            Cancel_Qty = 0,
                            Tolerance = 0,
                            Returnable_Qty = 0,
                            Closure_qty = 0,
                            Inp_CancelQty = 0,
                            transferIn = 0,
                            transferOut = 0,
                            IP_MarkupRate = 0,
                            MarkupValue = 0,
                            Dely_Returnqty = 0,
                            Loss_Qty = 0,
                            buy_ord_ship = "O",

                        });
                    }
                }


                var result = repo.UpdateProdMas(GrpmasInsert, IpGrpDetInsert, OpGrpDetInsert, ProInsert, detailList, detList, "Update");
                return new Response<int>(1, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception ex)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Response<int> DeleteProdMas(Domain.Group_Prod_Prg_Mas ProdMasAdd)
        {

            decimal CsecQty = 0;
            try
            {
                AxonApparel.Repository.Group_Prod_Prg_Mas GrpmasInsert = new AxonApparel.Repository.Group_Prod_Prg_Mas
                {
                    GrpProdPrgid = ProdMasAdd.GrpProdPrgid,
                    GrpProdPrgNo = ProdMasAdd.GrpProdPrgNo,
                    Companyid = ProdMasAdd.Companyid,
                    Styleid = ProdMasAdd.Styleid,
                    Buy_Ord_MasId = ProdMasAdd.Buy_Ord_MasId,
                    Job_ord_no = ProdMasAdd.Job_ord_no,
                    GrpProgDate = ProdMasAdd.GrpProgDate,
                };
                var IpGrpDetInsert = new List<Repository.Group_Prod_Prg_Det>();

                if (ProdMasAdd.IpGrpdet != null)
                {
                    if (ProdMasAdd.IpGrpdet.Count > 0)
                    {
                        foreach (var item in ProdMasAdd.IpGrpdet)
                        {
                            IpGrpDetInsert.Add(new Repository.Group_Prod_Prg_Det
                            {

                                GrpProdPgmdetid = item.GrpProdPgmdetid,
                                GrpProdPrgid = item.GrpProdPrgid,
                                Prodprgid = item.Prodprgid,
                                Processid = item.Processid,
                                Itemid = item.Itemid,
                                Colorid = item.Colorid,
                                Sizeid = item.Sizeid,
                                Prog_Op_Qty = item.Prog_Op_Qty,
                                BalanceQty = item.BalanceQty,
                                GrpQty = item.GrpQty,
                                InorOut = item.InorOut,
                            });
                        }
                    }
                }


                var OpGrpDetInsert = new List<Repository.Group_Prod_Prg_Det>();

                if (ProdMasAdd.IpGrpdet != null)
                {
                    if (ProdMasAdd.IpGrpdet.Count > 0)
                    {
                        foreach (var item in ProdMasAdd.OpGrpdet)
                        {
                            OpGrpDetInsert.Add(new Repository.Group_Prod_Prg_Det
                            {

                                GrpProdPgmdetid = item.GrpProdPgmdetid,
                                GrpProdPrgid = item.GrpProdPrgid,
                                Prodprgid = item.Prodprgid,
                                Processid = item.Processid,
                                Itemid = item.Itemid,
                                Colorid = item.Colorid,
                                Sizeid = item.Sizeid,
                                Prog_Op_Qty = item.Prog_Op_Qty,
                                BalanceQty = item.BalanceQty,
                                GrpQty = item.GrpQty,
                                InorOut = item.InorOut,
                            });
                        }
                    }
                }

                AxonApparel.Repository.ProcessProd_Prg_Mas ProInsert = new AxonApparel.Repository.ProcessProd_Prg_Mas

                {
                    ProdPrgid = ProdMasAdd.ProdPrgid,
                    ProdPrgNo = ProdMasAdd.ProdPrgNo,
                    ProcessId = ProdMasAdd.GrpProcessid,
                    companyid = ProdMasAdd.Companyid,
                    Job_ord_no = ProdMasAdd.Job_ord_no,
                    ProgDate = ProdMasAdd.GrpProgDate,
                    Closed = "N",
                    Prog_Seq_No = ProdMasAdd.Prog_Seq_No,
                    Amend = ProdMasAdd.Amend,
                    Approved = ProdMasAdd.Approved,
                    FinalizeAutoPost = ProdMasAdd.FinalizeAutoPost,
                    CreatedBy = ProdMasAdd.CreatedBy,
                    ApprovedBy = ProdMasAdd.ApprovedBy


                };

                var detailList = new List<Repository.ProcessProd_Prg_Det>();
                if (ProdMasAdd.ProdListInputDetails != null)
                {
                    if (ProdMasAdd.ProdListInputDetails.Count > 0)
                    {
                        foreach (var item in ProdMasAdd.ProdListInputDetails)
                        {


                            detailList.Add(new Repository.ProcessProd_Prg_Det
                            {
                                Prodprgid = item.Prodprgid,
                                Prodprgdetid = item.Prodprgdetid,
                                Itemid = item.Itemid,
                                Colorid = item.Colorid,
                                Sizeid = item.Sizeid,
                                InorOut = item.InorOut,
                                CatType = "M",
                                ActualPlan_Qty = (decimal)item.Prog_Op_Qty,
                                Prog_Op_Qty = (decimal)item.Prog_Op_Qty,
                                AltItem = item.AltItem,
                                Amended = item.Amended,
                                Issue_qty = item.Issue_qty,
                                order_qty = item.order_qty,
                                GrpQty = item.GrpQty,
                               
                                LastProcessid=0,
                                BalanceQty=0,
                                Receipt_Qty=0,
                                Return_Qty=0,
                                Damage_qty=0,
                                Cancel_Qty=0,
                                Tolerance=0,
                                Returnable_Qty=0,
                                Closure_qty=0,
                                Inp_CancelQty=0,
                                transferIn=0,
                                transferOut=0,
                                IP_MarkupRate=0,
                                MarkupValue=0,
                                Dely_Returnqty=0,
                                Loss_Qty=0,
                                buy_ord_ship="O",


                            });
                        }
                    }
                }

                var detList = new List<Repository.ProcessProd_Prg_Det>();

                if (ProdMasAdd.ProdListOutputtDetails != null)
                {
                    foreach (var item in ProdMasAdd.ProdListOutputtDetails)
                    {
                        detList.Add(new Repository.ProcessProd_Prg_Det
                        {
                            Prodprgid = item.Prodprgid,
                            Prodprgdetid = item.Prodprgdetid,
                            Itemid = item.Itemid,
                            Colorid = item.Colorid,
                            Sizeid = item.Sizeid,
                            InorOut = item.InorOut,
                            CatType = "M",
                            ActualPlan_Qty = (decimal)item.Prog_Op_Qty,
                            Prog_Op_Qty = (decimal)item.Prog_Op_Qty,
                            AltItem = item.AltItem,
                            Amended = item.Amended,
                            Issue_qty = item.Issue_qty,
                            order_qty = item.order_qty,
                            GrpQty = item.GrpQty,
                            GrpRate = item.rate,
                            LastProcessid = 0,
                            BalanceQty = 0,
                            Receipt_Qty = 0,
                            Return_Qty = 0,
                            Damage_qty = 0,
                            Cancel_Qty = 0,
                            Tolerance = 0,
                            Returnable_Qty = 0,
                            Closure_qty = 0,
                            Inp_CancelQty = 0,
                            transferIn = 0,
                            transferOut = 0,
                            IP_MarkupRate = 0,
                            MarkupValue = 0,
                            Dely_Returnqty = 0,
                            Loss_Qty = 0,
                            buy_ord_ship = "O",

                        });
                    }
                }


                var result = repo.DeleteProdMas(GrpmasInsert, IpGrpDetInsert, OpGrpDetInsert, ProInsert, detailList, detList, "Delete");
                return new Response<int>(1, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception ex)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }


        public Response<IList<Domain.Group_Prod_Prg_Det>> GetIpGrpProc(int masid)
        {
            try
            {
               
                var ProductWO = repo.GetIpGrpProc(masid);

                return new Response<IList<Domain.Group_Prod_Prg_Det>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Group_Prod_Prg_Det>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.Group_Prod_Prg_Det>> GetOpGrpProc(int masid)
        {
            try
            {

                var ProductWO = repo.GetOpGrpProc(masid);

                return new Response<IList<Domain.Group_Prod_Prg_Det>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Group_Prod_Prg_Det>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.Group_Prod_Prg_Det>> GetIpPrgdet(int masid)
        {
            try
            {

                var ProductWO = repo.GetIpPrgdet(masid);

                return new Response<IList<Domain.Group_Prod_Prg_Det>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Group_Prod_Prg_Det>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.Group_Prod_Prg_Det>> GetOpPrgdet(int masid)
        {
            try
            {

                var ProductWO = repo.GetOpPrgdet(masid);

                return new Response<IList<Domain.Group_Prod_Prg_Det>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Group_Prod_Prg_Det>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.Group_Prod_Prg_Mas>> GetGrpProcMas(int masid)
        {
            try
            {

                var ProductWO = repo.GetGrpProcMas(masid);

                return new Response<IList<Domain.Group_Prod_Prg_Mas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Group_Prod_Prg_Mas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.Group_Prod_Prg_Mas>> LoadMain(int? Ordid, int? Refid, int? Style, int? Process, int? Groupid, string FDt, string TDt)
        {
            try
            {

                var ProductWO = repo.LoadMain(Ordid, Refid, Style, Process, Groupid, FDt, TDt);

                return new Response<IList<Domain.Group_Prod_Prg_Mas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Group_Prod_Prg_Mas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.StockAudit>> GetGroupDropdwon(int? BMasId, int? JobId, int? Styleid, int? RefNo)
        {
            try
            {

                var ProductWO = repo.GetGroupDropdwon(BMasId, JobId, Styleid, RefNo);

                return new Response<IList<Domain.StockAudit>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.StockAudit>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.StockAudit>> GetProcessDropdwon( int? JobId)
        {
            try
            {

                var ProductWO = repo.GetProcessDropdwon(JobId);

                return new Response<IList<Domain.StockAudit>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.StockAudit>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> AddGrpProc(Domain.Group_Prod_Prg_Mas ProdMasAdd,string procid)
        {
            try
            {

                var IpGrpDetInsert = new List<Domain.Group_Prod_Prg_Det>();

                if (ProdMasAdd.IpGrpdet != null)
                {
                    if (ProdMasAdd.IpGrpdet.Count > 0)
                    {
                        foreach (var item in ProdMasAdd.IpGrpdet)
                        {
                            IpGrpDetInsert.Add(new Domain.Group_Prod_Prg_Det
                            {
                                Processid = item.Processid,
                                Process = item.Process,
                            });
                        }
                    }
                }

               

                var ProductWO = repo.AddGrpProc(IpGrpDetInsert,procid);

                return new Response<int>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
