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
    public class ProcessRepository : IProcessRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<MasterProcess> GetDataListAll()
        {
            //return entities.Process.OrderBy(c => c.Process1);
            List<MasterProcess> lstemployee = new List<MasterProcess>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterProcessLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    MasterProcess employee = new MasterProcess();
                    employee.ProcessId = Convert.ToInt32(rdr["ProcessId"]);
                    employee.Process1 = rdr["Process"].ToString();
                    employee.Description = rdr["Description"].ToString();
                    employee.Stage_Schedule = Convert.ToByte(rdr["Stage_Schedule"]);
                    employee.IsProportion = Convert.ToBoolean(rdr["IsProportion"]);
                    employee.IsEmblishmentProcess = Convert.ToBoolean(rdr["IsComponentProcess"]);
                    employee.AllowLotNumGen = Convert.ToBoolean(rdr["AllowLotNumGen"]);
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    employee.SeqNo = Convert.ToInt32(rdr["SeqNo"]);
                    employee.Prc_Allowance = Convert.ToDecimal(rdr["Prc_Allowance"]);
                    employee.Program_input = rdr["Program_input"].ToString();
                    employee.Program_output = rdr["Program_output"].ToString();
                    employee.GSTTaxCode = rdr["GSTTaxCode"].ToString();
                    employee.IGSTTaxCode = rdr["IGSTTaxCode"].ToString();
                    employee.ProcessLoss = Convert.ToDecimal(rdr["ProcessLoss"]);
                    employee.IsValidateProcessOrdQty = Convert.ToBoolean(rdr["IsValidateProcessOrdQty"]);
                    employee.IsProportion = Convert.ToBoolean(rdr["IsProportion"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public MasterProcess GetDataById(int id)
        {
            //return entities.Process.Where(c => c.ProcessId == id).FirstOrDefault();
            MasterProcess employee = new MasterProcess();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterProcessMasLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@processid", id);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.ProcessId = Convert.ToInt32(rdr["ProcessId"]);
                    employee.Process1 = rdr["Process"].ToString();
                    employee.Description = rdr["Description"].ToString();
                    employee.Stage_Schedule = Convert.ToByte(rdr["Stage_Schedule"]);
                    employee.IsProportion = Convert.ToBoolean(rdr["IsProportion"]);
                    employee.IsEmblishmentProcess = Convert.ToBoolean(rdr["IsComponentProcess"]);
                    employee.AllowLotNumGen = Convert.ToBoolean(rdr["AllowLotNumGen"]);
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    employee.SeqNo = Convert.ToInt32(rdr["SeqNo"]);
                    employee.Prc_Allowance = Convert.ToDecimal(rdr["Prc_Allowance"]);
                    employee.Program_input = rdr["Program_input"].ToString();
                    employee.Program_output = rdr["Program_output"].ToString();
                    employee.GSTTaxCode = rdr["GSTTaxCode"].ToString();
                    employee.IGSTTaxCode = rdr["IGSTTaxCode"].ToString();
                    employee.ProcessLoss = Convert.ToDecimal(rdr["ProcessLoss"]);
                    employee.IsValidateProcessOrdQty = Convert.ToBoolean(rdr["IsValidateProcessOrdQty"]);
                    employee.IsProportion = Convert.ToBoolean(rdr["IsProportion"]);
                }
            }
            return employee;

        }

        public int AddData(MasterProcess objPro)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var id = entities.Process.Add(objPro);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Process-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(MasterProcess objProc)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    var Process = entities.Process.Where(c => c.ProcessId == objProc.ProcessId).FirstOrDefault();
                    if (Process != null)
                    {
                        Process.IsActive = objProc.IsActive;
                        Process.Process1 = objProc.Process1;
                        Process.AllowLotNumGen = objProc.AllowLotNumGen;
                        Process.Description = objProc.Description;
                        Process.IsComponentProcess = objProc.IsComponentProcess;
                        Process.IsEmblishmentProcess = objProc.IsEmblishmentProcess;
                        Process.IsProportion = objProc.IsProportion;
                        Process.Prc_Allowance = objProc.Prc_Allowance;
                        Process.SeqNo = objProc.SeqNo;
                        Process.Stage_Schedule = objProc.Stage_Schedule;
                        Process.Program_input = objProc.Program_input;
                        Process.Program_output = objProc.Program_output;
                        Process.ProcessLoss = objProc.ProcessLoss;
                        Process.IsValidateProcessOrdQty = objProc.IsValidateProcessOrdQty;
                        Process.IsProportion = objProc.IsProportion;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Process-UpdateData");
                }

            }
            return reserved;
        }

        public bool DeleteData(int id)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var Process = entities.Process.Where(c => c.ProcessId == id).FirstOrDefault();
                    if (Process != null)
                    {
                        entities.Process.Remove(Process);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Process-DeleteData");
                }

            }
            return reserved;
        }

        public IQueryable<Domain.Process> Getlist()
        {
            IQueryable<Domain.Process> query = (from cd in entities.Proc_Apparel_BaseProgramType()
                                                select new Domain.Process
                                            {

                                                program = cd.Program,
                                                programtype = cd.ProgramType

                                            })
                                                                .ToList()
                                                                .AsQueryable();
            return query;
        }


        public IQueryable<Domain.Process> GetSeqDataList()
        {
            IQueryable<Domain.Process> query = (from cd in entities.Proc_Apparel_GetProSeqSetProcessLoad()
                                                select new Domain.Process
                                                {
                                                    ProcessId = cd.Processid,
                                                    ProcessName = cd.Process

                                                })
                                                               .ToList()
                                                               .AsQueryable();
            return query;
        }



        public IEnumerable<MasterProcess> GetPanelDataListAll()
        {
            //return entities.Process.OrderBy(c => c.Process1);
            List<MasterProcess> lstemployee = new List<MasterProcess>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterPanelProcessLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    MasterProcess employee = new MasterProcess();
                    employee.ProcessId = Convert.ToInt32(rdr["ProcessId"]);
                    employee.Process1 = rdr["Process"].ToString();
                    employee.Description = rdr["Description"].ToString();
                    employee.Stage_Schedule = Convert.ToByte(rdr["Stage_Schedule"]);
                    employee.IsProportion = Convert.ToBoolean(rdr["IsProportion"]);
                    employee.IsEmblishmentProcess = Convert.ToBoolean(rdr["IsComponentProcess"]);
                    employee.AllowLotNumGen = Convert.ToBoolean(rdr["AllowLotNumGen"]);
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    employee.SeqNo = Convert.ToInt32(rdr["SeqNo"]);
                    employee.Prc_Allowance = Convert.ToDecimal(rdr["Prc_Allowance"]);
                    employee.Program_input = rdr["Program_input"].ToString();
                    employee.Program_output = rdr["Program_output"].ToString();
                    employee.GSTTaxCode = rdr["GSTTaxCode"].ToString();
                    employee.IGSTTaxCode = rdr["IGSTTaxCode"].ToString();
                    employee.ProcessLoss = Convert.ToDecimal(rdr["ProcessLoss"]);
                    employee.IsValidateProcessOrdQty = Convert.ToBoolean(rdr["IsValidateProcessOrdQty"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }


        public IQueryable<Domain.Process> GetSeqDataSeqList()
        {
            IQueryable<Domain.Process> query = (from cd in entities.Proc_Apparel_GetProSeqSetSeqenceLoad()
                                                select new Domain.Process
                                                {
                                                    ProcessId = cd.Processid,
                                                    ProcessName = cd.Process

                                                })
                                                                .ToList()
                                                                .AsQueryable();
            return query;
        }


        public IList<Domain.Process> GetRepProcessCheckItemDetails(int processid)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetProcessMasterCheck(processid)
                         select new Domain.Process
                         {
                             CountProcessId = YD1.ChkProcId,
                             ProcessName = YD1.Process,


                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<MasterProcess> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
