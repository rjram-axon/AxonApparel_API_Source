CREATE TABLE [dbo].[Popup_Remainder_Mas]
(
	[RemainderId] INT IDENTITY(1,1) NOT NULL,
	[EntryDate] [datetime] NULL,
	[Userid] [int] NOT NULL,
	[RemainderDate] [datetime] NULL,
	[PopupMessage] [varchar](500) NOT NULL,
	[statusid] [int] NOT NULL,
	[Document_Name] [varchar](40) NULL,
	[Document_Id] [int] NULL,
	[Remarks] [varchar](200) NOT NULL Default(''),
	CONSTRAINT [PK_PopupRemid] PRIMARY KEY ([RemainderId]),
	CONSTRAINT [FK_DocumentNameRef] FOREIGN KEY ([Document_Name]) REFERENCES [prefix]([Document_Name]),
	--CONSTRAINT [FK_RemainderStatusRefId] FOREIGN KEY ([statusid]) REFERENCES [Remainder_Status]([statusid]),
	--CONSTRAINT [FK_UserNameRef] FOREIGN KEY ([Userid]) REFERENCES [UserName]([Userid]),

)
