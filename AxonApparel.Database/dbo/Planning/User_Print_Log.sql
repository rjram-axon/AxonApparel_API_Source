CREATE TABLE [dbo].[User_Print_Log]
(
[UserPrintID] [int] IDENTITY(1,1) NOT NULL, 
[UserID] [int] NOT NULL,
[ModuleName] [varchar](256) NOT NULL,
[DocumentName] [varchar](256) NOT NULL,
[MachineName] [varchar](256) NOT NULL,
[MachineIP] [varchar](50) NOT NULL,
[PrintingDateTime] [datetime] NOT NULL DEFAULT (getdate()),
[EntryNo] [varchar](20) NOT NULL DEFAULT ('')
)
