using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
namespace AxonApparel.Repository
{
    public class BuyerChargesRepository : IBuyerChargesRepository
    {
        MasterEntities entities = new MasterEntities();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public bool AddData(BuyerCharges objAd, List<BuyerCharges> objCDet, string Mode)
        {
            bool reserved = false;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    if (objCDet != null && objCDet.Count > 0)
                    {
                        foreach (var item in objCDet)
                        {
                            entities.BuyerCharges.Add(item);
                        }
                        entities.SaveChanges();
                    }
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


        public IQueryable<Domain.BuyerCharges> LoadMaingrid()
        {
            IQueryable<Domain.BuyerCharges> query = (from cd in entities.Proc_Apparel_GetBuyerChargesMainGrid()
                                                     select new Domain.BuyerCharges
                                        {
                                            BuyerId = (int)cd.buyerid,
                                            Buyer = cd.Buyer
                                        }).AsQueryable();
            return query;
        }


        public IList<Domain.BuyerCharges> GetbyId(int BuyerId)
        {
            IList<Domain.BuyerCharges> query = (from cd in entities.Proc_Apparel_GetBuyerChargesdet(BuyerId)
                                                select new Domain.BuyerCharges
                                                {
                                                    BuyerId = (int)cd.BuyerId,
                                                    FromQuantity = (decimal)cd.FromQuantity,
                                                    ToQuantity = (decimal)cd.ToQuantity,
                                                    ShippingExpense = (decimal)cd.ShippingExpense,
                                                    BankExpense = (decimal)cd.BankExpense,
                                                    CIFExpense = (decimal)cd.CIFExpense,
                                                    Slno = cd.BuyerchargesId
                                                }).ToList();
            return query;
        }


        public bool UpdData(BuyerCharges objAd, List<BuyerCharges> objCDet, string Mode)
        {
            bool reserved = false;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {


                    var deletedet = entities.BuyerCharges.Where(d => d.BuyerId == objAd.BuyerId).ToList<BuyerCharges>();

                    deletedet.ForEach(c => entities.BuyerCharges.Remove(c));
                    entities.SaveChanges();

                    if (objCDet != null && objCDet.Count > 0)
                    {
                        foreach (var item in objCDet)
                        {
                            entities.BuyerCharges.Add(item);
                        }
                        entities.SaveChanges();
                    }
                    reserved = true;


                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();

                }
                return reserved;
            }
        }


        public bool DelData(BuyerCharges objAd, List<BuyerCharges> objCDet, string Mode)
        {
            bool reserved = false;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {


                    var deletedet = entities.BuyerCharges.Where(d => d.BuyerId == objAd.BuyerId).ToList<BuyerCharges>();

                    deletedet.ForEach(c => entities.BuyerCharges.Remove(c));
                    entities.SaveChanges();


                    reserved = true;


                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();

                }
                return reserved;
            }
        }





        public BuyerCharges ListMainGrid(int buyid)
        {
            //return entities.BuyerCharges.Where(c => c.BuyerId == buyid).FirstOrDefault();
            BuyerCharges employee = new BuyerCharges();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from BuyerCharges where BuyerId= " + buyid;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.BuyerchargesId = Convert.ToInt32(rdr["BuyerchargesId"]);
                    employee.BuyerId = Convert.ToInt32(rdr["BuyerId"]);
                    employee.FromQuantity = Convert.ToDecimal(rdr["FromQuantity"]);
                    employee.ToQuantity = Convert.ToDecimal(rdr["ToQuantity"]);
                    employee.ShippingExpense = Convert.ToDecimal(rdr["ShippingExpense"]);
                    employee.CIFExpense = Convert.ToDecimal(rdr["CIFExpense"]);
                    employee.BankExpense = Convert.ToDecimal(rdr["BankExpense"]);
                }
            }
            return employee;
        }
    }
}
