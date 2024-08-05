
CREATE TABLE [dbo].[User_Entry_Log](
	[UserID] [int] NULL,
	[ModuleName] [varchar](50) NULL,
	[EntryName] [varchar](50) NULL,
	[MachineName] [varchar](50) NULL,
	[MachineIP] [varchar](20) NULL,
	[EntryMode] [varchar](15) NULL,
	[EntryDate] [datetime] NULL,
	[EntryNo] [varchar](100) NULL, 
	EntryLogid int identity primary key
) ON [PRIMARY]

GO



ALTER TABLE [dbo].[User_Entry_Log]  WITH NOCHECK ADD  CONSTRAINT [fk_user_entry_log_userid] FOREIGN KEY([UserID])
REFERENCES [dbo].[UserName] ([Userid])
GO

ALTER TABLE [dbo].[User_Entry_Log] CHECK CONSTRAINT [fk_user_entry_log_userid]
GO



