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
    public class ProcessBusiness:IProcessBusines
    {
        IProcessRepository ProRep = new ProcessRepository();

        public Response<IEnumerable<Domain.Process>> GetProcess()
        {
            try
            {

                var ProList = ProRep.GetDataListAll();

                return new Response<IEnumerable<Domain.Process>>(ProList.Select(m => new Domain.Process
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    ProcessId = m.ProcessId,
                    ProcessName = m.Process1,
                    IsEmblishmentProcess = (bool)m.IsEmblishmentProcess ? "TRUE" : "FALSE",
                    IsValidateProcessOrdQty = m.IsValidateProcessOrdQty ? "TRUE" : "FALSE",
                 //   Description = m.Description,               
                   // SeqNo = Convert.ToInt32(m.SeqNo),
                    IsProportion = (bool)m.IsProportion ? "TRUE" : "FALSE",
                    AllowLotNumGen = m.AllowLotNumGen ? "TRUE" : "FALSE",
                    Stage_Schedule=(byte) m.Stage_Schedule,
                    Programinput=m.Program_input,
                    Programoutput=m.Program_output,
                    ProcessLoss = (decimal)(m.ProcessLoss == null ? 0 : m.ProcessLoss),
                }), Status.SUCCESS, "Fetched Successfully");

            }
                

            catch (Exception)
            {
                return new Response<IEnumerable<Domain.Process>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IEnumerable<Domain.Process>> GetPanelProcess()
        {
            try
            {

                var ProList = ProRep.GetPanelDataListAll();

                return new Response<IEnumerable<Domain.Process>>(ProList.Select(m => new Domain.Process
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    ProcessId = m.ProcessId,
                    ProcessName = m.Process1,
                    IsEmblishmentProcess = (bool)m.IsEmblishmentProcess ? "TRUE" : "FALSE",
                    IsValidateProcessOrdQty = m.IsValidateProcessOrdQty ? "TRUE" : "FALSE",
                    //   Description = m.Description,               
                    // SeqNo = Convert.ToInt32(m.SeqNo),
                    // IsProportion=Convert.ToInt32(m.IsProportion).ToString(),
                    AllowLotNumGen = m.AllowLotNumGen ? "TRUE" : "FALSE",
                    Stage_Schedule = (byte)m.Stage_Schedule,
                    Programinput = m.Program_input,
                    Programoutput = m.Program_output,
                    ProcessLoss = (decimal)(m.ProcessLoss == null ? 0 : m.ProcessLoss),
                }), Status.SUCCESS, "Fetched Successfully");

            }


            catch (Exception)
            {
                return new Response<IEnumerable<Domain.Process>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.Process> GetDataById(int ProcessId)
        {
            try
            {

                var ProList = ProRep.GetDataById(ProcessId);

                return new Response<Domain.Process>(new Domain.Process
                {
                    IsActive = ProList.IsActive ? "TRUE" : "FALSE",
                    ProcessId = ProList.ProcessId,
                    ProcessName = ProList.Process1,
                    IsEmblishmentProcess = (bool)ProList.IsEmblishmentProcess ? "TRUE" : "FALSE",
                    IsValidateProcessOrdQty = ProList.IsValidateProcessOrdQty ? "TRUE" : "FALSE",
                    IsProportion = (bool)ProList.IsProportion ? "TRUE" : "FALSE",
                  //  Description = ProList.Description,
                   // SeqNo = Convert.ToInt32(ProList.SeqNo),
                   // IsProportion = Convert.ToInt32(ProList.IsProportion).ToString(),
                    AllowLotNumGen = ProList.AllowLotNumGen ? "TRUE" : "FALSE",
                    Stage_Schedule =(byte) ProList.Stage_Schedule,
                    Programoutput=ProList.Program_output,
                    Programinput=ProList.Program_input,
                    ProcessLoss = (decimal)(ProList.ProcessLoss == null ? 0 : ProList.ProcessLoss),
                }, Status.SUCCESS, "Fetched Successfully");

            }
            catch
            {
                return new Response<Domain.Process>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateProcess(Domain.Process Process)
        {
            try
            {
                if (string.IsNullOrEmpty(Process.ProcessName)) return new Response<int>(0, Status.ERROR, "Given Process is empty");
                if (isNameAvailableAlready(Process, "ADD")) return new Response<int>(-1, Status.ERROR, "Given Process is already available");

                return new Response<int>(ProRep.AddData(new AxonApparel.Repository.MasterProcess
                {
                    IsActive = Process.IsActive.ToUpper() == "TRUE",
                    ProcessId = Process.ProcessId,
                    Process1 = Process.ProcessName,
                    IsComponentProcess = false,
                    IsEmblishmentProcess = Process.IsEmblishmentProcess.ToUpper() == "TRUE",
                    IsValidateProcessOrdQty = Process.IsValidateProcessOrdQty.ToUpper() == "TRUE",
                    IsProportion = Process.IsProportion.ToUpper() == "TRUE",
                  //  Description = Process.Description,
                 //   SeqNo = Convert.ToInt32(Process.SeqNo),
                   // IsProportion = Process.IsProportion.ToUpper() == "TRUE",
                    AllowLotNumGen = Process.AllowLotNumGen.ToUpper() == "TRUE",
                    Stage_Schedule=Process.Stage_Schedule,
                    Program_input=Process.Programinput,
                    Program_output=Process.Programoutput,
                    ProcessLoss=Process.ProcessLoss
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateProcess(Domain.Process obProcess)
        {
            if (isNameAvailableAlready(obProcess, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given Process is already available");

            return new Response<bool>(ProRep.UpdateData(new AxonApparel.Repository.MasterProcess
            {
                IsActive = obProcess.IsActive.ToUpper() == "TRUE",
                ProcessId = obProcess.ProcessId,
                Process1 = obProcess.ProcessName,
                IsComponentProcess = false,
                IsEmblishmentProcess = obProcess.IsEmblishmentProcess.ToUpper() == "TRUE",
                IsValidateProcessOrdQty = obProcess.IsValidateProcessOrdQty.ToUpper() == "TRUE",
                IsProportion = obProcess.IsProportion.ToUpper() == "TRUE",
                //Description = obProcess.Description,
                //SeqNo = Convert.ToInt32(obProcess.SeqNo),
                //IsProportion = obProcess.IsProportion.ToUpper() == "TRUE",
                AllowLotNumGen = obProcess.AllowLotNumGen.ToUpper() == "TRUE",
                Stage_Schedule = obProcess.Stage_Schedule ,
                Program_input=obProcess.Programinput,
                Program_output=obProcess.Programoutput,
                ProcessLoss = obProcess.ProcessLoss
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteProcess(int ProcessId)
        {
            return new Response<bool>(ProRep.DeleteData(ProcessId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.Process Prs, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetProcess().Value.Where(c => c.ProcessName.ToUpper() == Prs.ProcessName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetProcess().Value.Where(c => c.ProcessName.ToUpper() == Prs.ProcessName.ToUpper() && c.ProcessId != Prs.ProcessId).ToList().Count > 0);
            }
            return false;

        }


        public Response<IQueryable<Domain.Process>> GetProgramlist()
        {

            try
            {
                var CurDetList = ProRep.Getlist();

                return new Response<IQueryable<Domain.Process>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.Process>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.Process>> GetProcessSeqSetUp()
        {     
            try
            {
                var CurDetList = ProRep.GetSeqDataList();

                return new Response<IQueryable<Domain.Process>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.Process>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.Process>> GetProcessSeqSetSeqUp()
        {
            try
            {
                var CurDetList = ProRep.GetSeqDataSeqList();

                return new Response<IQueryable<Domain.Process>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.Process>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<Domain.Process>> GetProcessCheckItemDetails(int ProcessId)
        {
            try
            {
                var ProductEWO = ProRep.GetRepProcessCheckItemDetails(ProcessId);

                return new Response<IList<Domain.Process>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Process>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
