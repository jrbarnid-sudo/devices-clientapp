export const getDevices = async () => {
  return await (await fetch(`/devices`)).json();
};

export const getDevicesById = async (id) => {
  if (!id) return null;

  return await (await fetch(`/devices/${id}`)).json();
};

export const deleteDevice = async (id) => {
  if (!id) return null;

  await fetch(`/devices/${id}`, {
    method: "DELETE",
  });
};

export const addDevice = async (systemName, type, hddCapacity) => {
  if (!systemName || !type || !hddCapacity) return null;

  await fetch(`/devices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      system_name: systemName,
      type: type,
      hdd_capacity: hddCapacity,
    }),
  });
};

export const updateDevice = async (id, systemName, type, hddCapacity) => {
  if (!id || !systemName || !type || !hddCapacity) return null;

  await fetch(`/devices/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      system_name: systemName,
      type: type,
      hdd_capacity: hddCapacity,
    }),
  });
};
